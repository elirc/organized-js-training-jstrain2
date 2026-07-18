import { and, eq, gt, sql } from "drizzle-orm";
import { db } from "@/lib/db";
import { idempotencyKeys } from "@/lib/db/schema";
import { sha256 } from "@/lib/utils/crypto";

const DEFAULT_TTL_HOURS = Number(process.env.IDEMPOTENCY_KEY_TTL_HOURS ?? "24");

export function generateWorkflowIdempotencyKey(params: {
  workflowId: string;
  triggerData: Record<string, unknown>;
  bucketMinutes?: number;
}): string {
  const bucketMinutes = params.bucketMinutes ?? 1;
  const now = new Date();
  now.setSeconds(0, 0);
  now.setMinutes(Math.floor(now.getMinutes() / bucketMinutes) * bucketMinutes);

  return sha256(`${params.workflowId}:${JSON.stringify(params.triggerData)}:${now.toISOString()}`);
}

export function generateWebhookIdempotencyKey(params: {
  endpointId: string;
  body: string;
  headerKey?: string;
}): string {
  return sha256(`${params.endpointId}:${params.body}:${params.headerKey ?? ""}`);
}

export async function lookupIdempotencyRunId(key: string, tenantId: string): Promise<string | null> {
  const row = await db.query.idempotencyKeys.findFirst({
    where: and(eq(idempotencyKeys.key, key), eq(idempotencyKeys.tenantId, tenantId), gt(idempotencyKeys.expiresAt, new Date())),
  });

  return row?.runId ?? null;
}

export async function reserveIdempotencyKey(params: {
  key: string;
  tenantId: string;
  runId: string;
  ttlHours?: number;
}): Promise<boolean> {
  const ttlHours = params.ttlHours ?? DEFAULT_TTL_HOURS;
  const expiresAt = new Date(Date.now() + ttlHours * 60 * 60 * 1000);

  const rows = await db
    .insert(idempotencyKeys)
    .values({
      key: params.key,
      tenantId: params.tenantId,
      runId: params.runId,
      expiresAt,
    })
    .onConflictDoNothing({ target: [idempotencyKeys.key, idempotencyKeys.tenantId] })
    .returning({ id: idempotencyKeys.id });

  return rows.length > 0;
}

export async function cleanupExpiredIdempotencyKeys(): Promise<number> {
  const result = await db
    .delete(idempotencyKeys)
    .where(sql`${idempotencyKeys.expiresAt} < now()`)
    .returning({ id: idempotencyKeys.id });

  return result.length;
}
