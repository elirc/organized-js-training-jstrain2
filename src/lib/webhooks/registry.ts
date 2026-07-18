import { and, eq } from "drizzle-orm";
import { db } from "@/lib/db";
import { webhookEndpoints } from "@/lib/db/schema";

export async function getWebhookEndpoint(endpointId: string) {
  return db.query.webhookEndpoints.findFirst({
    where: eq(webhookEndpoints.id, endpointId),
  });
}

export async function listTenantWebhookEndpoints(tenantId: string) {
  return db.query.webhookEndpoints.findMany({
    where: eq(webhookEndpoints.tenantId, tenantId),
    orderBy: (table, { desc }) => [desc(table.createdAt)],
  });
}

export async function setWebhookLastTriggered(endpointId: string): Promise<void> {
  await db
    .update(webhookEndpoints)
    .set({ lastTriggered: new Date() })
    .where(eq(webhookEndpoints.id, endpointId));
}

export async function assertTenantEndpoint(endpointId: string, tenantId: string) {
  return db.query.webhookEndpoints.findFirst({
    where: and(eq(webhookEndpoints.id, endpointId), eq(webhookEndpoints.tenantId, tenantId)),
  });
}
