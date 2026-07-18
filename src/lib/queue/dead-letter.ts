import { db } from "@/lib/db";
import { deadLetterItems, eventLog, workflowRuns } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

interface DeadLetterInput {
  runId: string;
  queueName: string;
  jobData: Record<string, unknown>;
  error: string;
  failureCount: number;
  stepLogId?: string;
  tenantId?: string;
}

export async function saveDeadLetter(input: DeadLetterInput): Promise<void> {
  await db.insert(deadLetterItems).values({
    runId: input.runId,
    stepLogId: input.stepLogId,
    queueName: input.queueName,
    jobData: input.jobData,
    error: input.error,
    failureCount: input.failureCount,
    status: "pending",
  });

  await db
    .update(workflowRuns)
    .set({ status: "dead_letter", completedAt: new Date(), error: input.error })
    .where(eq(workflowRuns.id, input.runId));

  await db.insert(eventLog).values({
    tenantId: input.tenantId,
    eventType: "run.dead_lettered",
    entityType: "run",
    entityId: input.runId,
    payload: {
      queueName: input.queueName,
      failureCount: input.failureCount,
    },
  });
}
