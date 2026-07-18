import { and, asc, eq, sql } from "drizzle-orm";
import { NextRequest } from "next/server";
import { db } from "@/lib/db";
import { workflowSteps, workflows } from "@/lib/db/schema";
import { requireTenantContext } from "@/lib/auth/tenant";
import { fromError, ok } from "@/lib/utils/api";
import { workflowUpdateSchema } from "@/lib/validators/workflow.schema";

export async function GET(_request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { tenantId } = await requireTenantContext();

    const workflow = await db.query.workflows.findFirst({
      where: and(eq(workflows.id, params.id), eq(workflows.tenantId, tenantId)),
    });

    if (!workflow) {
      return ok(null);
    }

    const steps = await db.query.workflowSteps.findMany({
      where: eq(workflowSteps.workflowId, workflow.id),
      orderBy: [asc(workflowSteps.position)],
    });

    return ok({ workflow, steps });
  } catch (error: unknown) {
    return fromError(error);
  }
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { tenantId } = await requireTenantContext();
    const payload = workflowUpdateSchema.parse(await request.json());

    const [updated] = await db
      .update(workflows)
      .set({
        name: payload.name,
        description: payload.description,
        triggerType: payload.triggerType,
        triggerConfig: payload.triggerConfig,
        isActive: payload.isActive,
        updatedAt: new Date(),
        version: sql`${workflows.version} + 1`,
      })
      .where(and(eq(workflows.id, params.id), eq(workflows.tenantId, tenantId)))
      .returning();

    if (!updated) {
      return ok(null);
    }

    if (payload.steps) {
      await db.delete(workflowSteps).where(eq(workflowSteps.workflowId, updated.id));
      if (payload.steps.length > 0) {
        await db.insert(workflowSteps).values(
          payload.steps.map((step) => ({
            workflowId: updated.id,
            stepType: step.stepType,
            name: step.name,
            position: step.position,
            config: step.config,
            inputMapping: step.inputMapping,
            timeoutMs: step.timeoutMs,
            retryConfig: step.retryConfig,
            onFailure: step.onFailure,
            nextStepId: step.nextStepId,
            conditionBranches: step.conditionBranches ?? null,
          })),
        );
      }
    }

    return ok(updated);
  } catch (error: unknown) {
    return fromError(error);
  }
}

export async function DELETE(_request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { tenantId } = await requireTenantContext();

    const [updated] = await db
      .update(workflows)
      .set({ isActive: false, updatedAt: new Date() })
      .where(and(eq(workflows.id, params.id), eq(workflows.tenantId, tenantId)))
      .returning();

    return ok(updated ?? null);
  } catch (error: unknown) {
    return fromError(error);
  }
}
