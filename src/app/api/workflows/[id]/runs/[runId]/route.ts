import { and, asc, eq } from "drizzle-orm";
import { NextRequest } from "next/server";
import { db } from "@/lib/db";
import { stepLogs, workflowRuns, workflows } from "@/lib/db/schema";
import { requireTenantContext } from "@/lib/auth/tenant";
import { fromError, ok } from "@/lib/utils/api";

export async function GET(
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

    const run = await db.query.workflowRuns.findFirst({
      where: and(eq(workflowRuns.id, params.runId), eq(workflowRuns.workflowId, workflow.id)),
    });

    if (!run) {
      return ok(null);
    }

    const logs = await db.query.stepLogs.findMany({
      where: eq(stepLogs.runId, run.id),
      orderBy: [asc(stepLogs.createdAt)],
    });

    return ok({ run, logs });
  } catch (error: unknown) {
    return fromError(error);
  }
}
