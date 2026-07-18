import { and, eq, sql } from "drizzle-orm";
import { NextRequest } from "next/server";
import { db } from "@/lib/db";
import { deadLetterItems, workflowRuns } from "@/lib/db/schema";
import { workflowQueue } from "@/lib/queue/workflows.queue";
import { requireTenantContext } from "@/lib/auth/tenant";
import { fromError, ok } from "@/lib/utils/api";

export async function GET(_request: NextRequest) {
  try {
    const { tenantId } = await requireTenantContext();

    const [runCount] = await db
      .select({ count: sql<number>`count(*)` })
      .from(workflowRuns)
      .where(eq(workflowRuns.tenantId, tenantId));

    const [successCount] = await db
      .select({ count: sql<number>`count(*)` })
      .from(workflowRuns)
      .where(and(eq(workflowRuns.tenantId, tenantId), eq(workflowRuns.status, "completed")));

    const [deadCount] = await db
      .select({ count: sql<number>`count(*)` })
      .from(deadLetterItems)
      .where(eq(deadLetterItems.status, "pending"));

    const queueCounts = await workflowQueue.getJobCounts("waiting", "active", "delayed", "failed", "completed");

    const totalRuns = Number(runCount.count ?? 0);
    const totalSuccess = Number(successCount.count ?? 0);

    return ok({
      totalRuns,
      successRate: totalRuns > 0 ? Math.round((totalSuccess / totalRuns) * 100) : 0,
      deadLetterCount: Number(deadCount.count ?? 0),
      queue: queueCounts,
    });
  } catch (error: unknown) {
    return fromError(error);
  }
}
