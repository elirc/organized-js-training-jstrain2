import { and, eq } from "drizzle-orm";
import { NextRequest } from "next/server";
import { db } from "@/lib/db";
import { workflowRuns, workflows } from "@/lib/db/schema";
import { generateWorkflowIdempotencyKey } from "@/lib/engine/idempotency";
import { workflowQueue } from "@/lib/queue/workflows.queue";
import { requireTenantContext } from "@/lib/auth/tenant";
import { fromError, ok } from "@/lib/utils/api";

export async function POST(
  _request: NextRequest,
  { params }: { params: { id: string; runId: string } },
) {
  try {
    const { tenantId } = await requireTenantContext();

    const workflow = await db.query.workflows.findFirst({
      where: and(eq(workflows.id, params.id), eq(workflows.tenantId, tenantId)),
    });

    if (!workflow) {
      return ok(null);
    }

    const originalRun = await db.query.workflowRuns.findFirst({
      where: and(eq(workflowRuns.id, params.runId), eq(workflowRuns.workflowId, workflow.id)),
    });

    if (!originalRun) {
      return ok(null);
    }

    const idempotencyKey = generateWorkflowIdempotencyKey({
      workflowId: workflow.id,
      triggerData: originalRun.triggerData,
    });

    const [newRun] = await db
      .insert(workflowRuns)
      .values({
        workflowId: workflow.id,
        tenantId,
        triggeredBy: "replay",
        triggerData: originalRun.triggerData,
        idempotencyKey,
        workflowVersion: originalRun.workflowVersion,
        status: "pending",
      })
      .returning();

    await workflowQueue.add(`replay-${newRun.id}`, {
      runId: newRun.id,
      workflowId: workflow.id,
      tenantId,
      triggerData: originalRun.triggerData,
      idempotencyKey,
      workflowVersion: originalRun.workflowVersion ?? workflow.version,
    });

    return ok({ runId: newRun.id }, 202);
  } catch (error: unknown) {
    return fromError(error);
  }
}
