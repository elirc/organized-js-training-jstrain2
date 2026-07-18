import { eq } from "drizzle-orm";
import { NextRequest } from "next/server";
import { db } from "@/lib/db";
import { webhookEndpoints, workflows } from "@/lib/db/schema";
import { requireTenantContext } from "@/lib/auth/tenant";
import { fromError, ok } from "@/lib/utils/api";
import { webhookEndpointCreateSchema } from "@/lib/validators/webhook.schema";

export async function GET() {
  try {
    const { tenantId } = await requireTenantContext();
    const endpoints = await db.query.webhookEndpoints.findMany({
      where: eq(webhookEndpoints.tenantId, tenantId),
      orderBy: (table, { desc }) => [desc(table.createdAt)],
    });

    return ok({ items: endpoints });
  } catch (error: unknown) {
    return fromError(error);
  }
}

export async function POST(request: NextRequest) {
  try {
    const { tenantId } = await requireTenantContext();
    const payload = webhookEndpointCreateSchema.parse(await request.json());

    const workflow = await db.query.workflows.findFirst({
      where: eq(workflows.id, payload.workflowId),
    });

    if (!workflow || workflow.tenantId !== tenantId) {
      return ok(null);
    }

    const [created] = await db
      .insert(webhookEndpoints)
      .values({
        tenantId,
        workflowId: payload.workflowId,
        path: payload.path,
        signingSecret: payload.signingSecret,
        isActive: payload.isActive,
      })
      .returning();

    return ok(created, 201);
  } catch (error: unknown) {
    return fromError(error);
  }
}
