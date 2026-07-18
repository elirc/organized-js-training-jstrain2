import { and, desc, eq, lt } from "drizzle-orm";
import { NextRequest } from "next/server";
import { db } from "@/lib/db";
import { workflowSteps, workflows } from "@/lib/db/schema";
import { requireTenantContext } from "@/lib/auth/tenant";
import { fromError, ok } from "@/lib/utils/api";
import { paginationSchema, workflowCreateSchema } from "@/lib/validators/workflow.schema";

export async function GET(request: NextRequest) {
  try {
    const { tenantId } = await requireTenantContext();
    const query = paginationSchema.parse({
      cursor: request.nextUrl.searchParams.get("cursor") ?? undefined,
      limit: request.nextUrl.searchParams.get("limit") ?? undefined,
    });

    const items = await db.query.workflows.findMany({
      where: and(
        eq(workflows.tenantId, tenantId),
        query.cursor ? lt(workflows.id, query.cursor) : undefined,
      ),
      orderBy: [desc(workflows.id)],
      limit: query.limit + 1,
    });

    const hasMore = items.length > query.limit;
    const sliced = hasMore ? items.slice(0, query.limit) : items;

    return ok({
      items: sliced,
      cursor: hasMore ? sliced[sliced.length - 1]?.id ?? null : null,
      limit: query.limit,
      hasMore,
    });
  } catch (error: unknown) {
    return fromError(error);
  }
}

export async function POST(request: NextRequest) {
  try {
    const { tenantId, userId } = await requireTenantContext();
    const payload = workflowCreateSchema.parse(await request.json());

    const [created] = await db
      .insert(workflows)
      .values({
        tenantId,
        createdBy: userId,
        name: payload.name,
        description: payload.description ?? null,
        triggerType: payload.triggerType,
        triggerConfig: payload.triggerConfig,
        isActive: payload.isActive,
      })
      .returning();

    if (payload.steps.length > 0) {
      await db.insert(workflowSteps).values(
        payload.steps.map((step) => ({
          workflowId: created.id,
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

    return ok(created, 201);
  } catch (error: unknown) {
    return fromError(error);
  }
}
