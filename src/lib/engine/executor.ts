import { and, asc, count, eq } from "drizzle-orm";
import { db } from "@/lib/db";
import { deadLetterItems, eventLog, stepLogs, tenants, workflowRuns, workflowSteps, workflows } from "@/lib/db/schema";
import { RunContext } from "@/lib/engine/context";
import { lookupIdempotencyRunId, reserveIdempotencyKey } from "@/lib/engine/idempotency";
import { getStepRunner } from "@/lib/engine/step-runners";
import type { StepOutput } from "@/lib/engine/step-runners/types";
import { redis } from "@/lib/queue/connection";
import { logger } from "@/lib/utils/logger";
import { computeBackoff, sleep } from "@/lib/utils/retry";
import { ConcurrencyLimitError, StepExecutionError } from "@/lib/utils/errors";

export interface WorkflowExecutionJob {
  runId: string;
  workflowId: string;
  tenantId: string;
  triggerData: Record<string, unknown>;
  idempotencyKey?: string;
  workflowVersion?: number;
}

interface RetryConfig {
  maxRetries: number;
  backoffMs: number;
  backoffMultiplier: number;
}

export class WorkflowExecutor {
  async run(job: WorkflowExecutionJob): Promise<{ runId: string; status: string }> {
    await this.claimConcurrency(job.tenantId);

    const startedAt = Date.now();
    const context = new RunContext(job.triggerData);

    try {
      if (job.idempotencyKey) {
        const existingRunId = await lookupIdempotencyRunId(job.idempotencyKey, job.tenantId);
        if (existingRunId) {
          logger.info({ tenantId: job.tenantId, runId: existingRunId }, "Skipping duplicate run by idempotency key");
          return { runId: existingRunId, status: "completed" };
        }
      }

      const workflow = await db.query.workflows.findFirst({
        where: and(eq(workflows.id, job.workflowId), eq(workflows.tenantId, job.tenantId)),
      });

      if (!workflow) {
        throw new Error("Workflow not found");
      }

      await db
        .update(workflowRuns)
        .set({ status: "running", startedAt: new Date(), workflowVersion: workflow.version })
        .where(eq(workflowRuns.id, job.runId));

      const steps = await db.query.workflowSteps.findMany({
        where: eq(workflowSteps.workflowId, job.workflowId),
        orderBy: [asc(workflowSteps.position)],
      });

      const stepById = new Map(steps.map((step, index) => [step.id, { step, index }]));

      let cursor = 0;
      while (cursor < steps.length) {
        const currentStep = steps[cursor];
        const output = await this.executeStep(job, currentStep, context);

        context.setStepOutput(currentStep.name, output.data);

        await redis.publish(
          `flowpilot:runs:${job.runId}`,
          JSON.stringify({
            event: "step.completed",
            runId: job.runId,
            stepId: currentStep.id,
            status: "completed",
            output: output.data,
          }),
        );

        if (currentStep.stepType === "condition") {
          const branches = Array.isArray(currentStep.conditionBranches)
            ? (currentStep.conditionBranches as Array<{ expression?: string; nextStepId?: string }>)
            : [];
          const matched = branches.find((branch) => Boolean(branch.expression) && output.data.passed);
          if (matched?.nextStepId) {
            const branchTarget = stepById.get(matched.nextStepId);
            if (branchTarget) {
              cursor = branchTarget.index;
              continue;
            }
          }
        }

        if (currentStep.nextStepId) {
          const explicitNext = stepById.get(currentStep.nextStepId);
          if (explicitNext) {
            cursor = explicitNext.index;
            continue;
          }
        }

        cursor += 1;
      }

      const durationMs = Date.now() - startedAt;

      await db
        .update(workflowRuns)
        .set({
          status: "completed",
          completedAt: new Date(),
          durationMs,
          contextData: context.getState() as unknown as Record<string, unknown>,
        })
        .where(eq(workflowRuns.id, job.runId));

      if (job.idempotencyKey) {
        await reserveIdempotencyKey({
          key: job.idempotencyKey,
          tenantId: job.tenantId,
          runId: job.runId,
        });
      }

      await db.insert(eventLog).values({
        tenantId: job.tenantId,
        eventType: "run.completed",
        entityType: "run",
        entityId: job.runId,
        payload: { durationMs },
      });

      await redis.publish(
        `flowpilot:runs:${job.runId}`,
        JSON.stringify({
          event: "run.completed",
          runId: job.runId,
          status: "completed",
          durationMs,
        }),
      );

      return { runId: job.runId, status: "completed" };
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : "Workflow run failed";

      await db
        .update(workflowRuns)
        .set({
          status: "failed",
          error: message,
          completedAt: new Date(),
          durationMs: Date.now() - startedAt,
          contextData: context.getState() as unknown as Record<string, unknown>,
        })
        .where(eq(workflowRuns.id, job.runId));

      await db.insert(eventLog).values({
        tenantId: job.tenantId,
        eventType: "run.failed",
        entityType: "run",
        entityId: job.runId,
        payload: {
          error: message,
        },
      });

      await db.insert(deadLetterItems).values({
        runId: job.runId,
        queueName: "workflow-execution",
        jobData: job as unknown as Record<string, unknown>,
        error: message,
        failureCount: 1,
      });

      await redis.publish(
        `flowpilot:runs:${job.runId}`,
        JSON.stringify({
          event: "run.failed",
          runId: job.runId,
          status: "failed",
          error: message,
        }),
      );

      throw error;
    } finally {
      await this.releaseConcurrency(job.tenantId);
    }
  }

  private async executeStep(
    job: WorkflowExecutionJob,
    step: typeof workflowSteps.$inferSelect,
    context: RunContext,
  ): Promise<StepOutput> {
    const retryConfig = this.parseRetryConfig(step.retryConfig);
    const runner = getStepRunner(step.stepType);
    const preparedConfig = (context.resolveTemplates(step.config) as Record<string, unknown>) ?? {};
    const inputData =
      (context.resolveTemplates(step.inputMapping) as Record<string, unknown>) ?? {
        triggerData: job.triggerData,
        steps: context.getState().steps,
      };

    for (let attempt = 1; attempt <= retryConfig.maxRetries + 1; attempt += 1) {
      const startedAt = Date.now();
      const [stepLog] = await db
        .insert(stepLogs)
        .values({
          runId: job.runId,
          stepId: step.id,
          stepName: step.name,
          stepType: step.stepType,
          status: "running",
          attempt,
          inputData,
          startedAt: new Date(),
        })
        .returning({ id: stepLogs.id });

      try {
        await redis.publish(
          `flowpilot:runs:${job.runId}`,
          JSON.stringify({ event: "step.started", runId: job.runId, stepId: step.id, attempt }),
        );

        const output = await runner.execute(
          {
            data: {
              ...inputData,
              triggerData: context.getState().triggerData,
              steps: context.getState().steps,
            },
            metadata: { runId: job.runId, stepId: step.id, attempt },
          },
          preparedConfig,
          context,
        );

        await db
          .update(stepLogs)
          .set({
            status: "completed",
            outputData: output.data,
            completedAt: new Date(),
            durationMs: Date.now() - startedAt,
          })
          .where(eq(stepLogs.id, stepLog.id));

        return output;
      } catch (error: unknown) {
        const message = error instanceof Error ? error.message : "Step failed";
        const code = error instanceof StepExecutionError ? error.code : "STEP_EXECUTION_ERROR";

        const hasRetry = attempt <= retryConfig.maxRetries;
        await db
          .update(stepLogs)
          .set({
            status: hasRetry ? "retrying" : "failed",
            error: message,
            errorCode: code,
            completedAt: new Date(),
            durationMs: Date.now() - startedAt,
          })
          .where(eq(stepLogs.id, stepLog.id));

        await redis.publish(
          `flowpilot:runs:${job.runId}`,
          JSON.stringify({
            event: hasRetry ? "step.retrying" : "step.failed",
            runId: job.runId,
            stepId: step.id,
            attempt,
            error: message,
          }),
        );

        if (hasRetry) {
          await sleep(computeBackoff(attempt, retryConfig));
          continue;
        }

        if (step.onFailure === "continue") {
          return {
            data: {
              skipped: true,
              error: message,
            },
          };
        }

        if (step.onFailure.startsWith("goto:")) {
          return {
            data: {
              skipped: true,
              error: message,
            },
            metadata: {
              goto: step.onFailure.slice(5),
            },
          };
        }

        throw new StepExecutionError(message, code);
      }
    }

    throw new StepExecutionError("Step execution exhausted retries", "STEP_RETRY_EXHAUSTED");
  }

  private parseRetryConfig(config: Record<string, unknown>): RetryConfig {
    const maxRetries = typeof config.maxRetries === "number" ? config.maxRetries : 3;
    const backoffMs = typeof config.backoffMs === "number" ? config.backoffMs : 1000;
    const backoffMultiplier = typeof config.backoffMultiplier === "number" ? config.backoffMultiplier : 2;

    return {
      maxRetries,
      backoffMs,
      backoffMultiplier,
    };
  }

  private async claimConcurrency(tenantId: string): Promise<void> {
    const lockKey = `flowpilot:tenant-lock:${tenantId}`;
    const lock = await redis.set(lockKey, "1", "PX", 5000, "NX");

    if (!lock) {
      throw new ConcurrencyLimitError("Tenant lock already held");
    }

    const [tenant] = await db
      .select({ maxConcurrency: tenants.maxConcurrency })
      .from(tenants)
      .where(eq(tenants.id, tenantId))
      .limit(1);

    if (!tenant) {
      throw new Error("Tenant not found");
    }

    const [running] = await db
      .select({ count: count() })
      .from(workflowRuns)
      .where(and(eq(workflowRuns.tenantId, tenantId), eq(workflowRuns.status, "running")));

    if (running.count >= tenant.maxConcurrency) {
      await redis.del(lockKey);
      throw new ConcurrencyLimitError();
    }
  }

  private async releaseConcurrency(tenantId: string): Promise<void> {
    await redis.del(`flowpilot:tenant-lock:${tenantId}`);
  }
}
