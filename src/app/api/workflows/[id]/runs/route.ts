import { and, desc, eq, lt } from "drizzle-orm";
import { NextRequest } from "next/server";
import { db } from "@/lib/db";
import { workflowRuns, workflows } from "@/lib/db/schema";
import { requireTenantContext } from "@/lib/auth/tenant";
import { fromError, ok } from "@/lib/utils/api";

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { tenantId } = await requireTenantContext();
    const limit = Number(request.nextUrl.searchParams.get("limit") ?? "20");
    const cursor = request.nextUrl.searchParams.get("cursor") ?? undefined;

    const workflow = await db.query.workflows.findFirst({
      where: and(eq(workflows.id, params.id), eq(workflows.tenantId, tenantId)),
    });

    if (!workflow) {
      return ok({ items: [], cursor: null, limit, hasMore: false });
    }

    const runs = await db.query.workflowRuns.findMany({
      where: and(
        eq(workflowRuns.workflowId, workflow.id),
        eq(workflowRuns.tenantId, tenantId),
        cursor ? lt(workflowRuns.id, cursor) : undefined,
      ),
      orderBy: [desc(workflowRuns.id)],
      limit: limit + 1,
    });

    const hasMore = runs.length > limit;
    const items = hasMore ? runs.slice(0, limit) : runs;

    return ok({
      items,
      cursor: hasMore ? items[items.length - 1]?.id ?? null : null,
      limit,
      hasMore,
    });
  } catch (error: unknown) {
    return fromError(error);
  }
}
