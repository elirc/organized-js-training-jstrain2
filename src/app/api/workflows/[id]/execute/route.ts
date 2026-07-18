import { and, eq } from "drizzle-orm";
import { NextRequest } from "next/server";
import { db } from "@/lib/db";
import { workflowRuns, workflows } from "@/lib/db/schema";
import { generateWorkflowIdempotencyKey } from "@/lib/engine/idempotency";
import { workflowQueue } from "@/lib/queue/workflows.queue";
import { requireTenantContext } from "@/lib/auth/tenant";
import { fromError, ok } from "@/lib/utils/api";

export async function POST(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { tenantId } = await requireTenantContext();
    const payload = (await request.json().catch(() => ({}))) as { triggerData?: Record<string, unknown>; idempotencyKey?: string };

    const workflow = await db.query.workflows.findFirst({
      where: and(eq(workflows.id, params.id), eq(workflows.tenantId, tenantId)),
    });

    if (!workflow) {
      return ok(null);
    }

    const triggerData = payload.triggerData ?? {};
    const idempotencyKey =
      payload.idempotencyKey ??
      generateWorkflowIdempotencyKey({
        workflowId: workflow.id,
        triggerData,
      });

    const [run] = await db
      .insert(workflowRuns)
      .values({
        workflowId: workflow.id,
        tenantId,
        triggeredBy: "manual",
        triggerData,
        idempotencyKey,
        status: "pending",
      })
      .returning();

    await workflowQueue.add(`run-${run.id}`, {
      runId: run.id,
      workflowId: workflow.id,
      tenantId,
      triggerData,
      idempotencyKey,
      workflowVersion: workflow.version,
    });

    return ok({ runId: run.id }, 202);
  } catch (error: unknown) {
    return fromError(error);
  }
}
