import { and, eq } from "drizzle-orm";
import { NextRequest } from "next/server";
import { db } from "@/lib/db";
import { eventLog, webhookEndpoints, workflowRuns, workflows } from "@/lib/db/schema";
import { generateWebhookIdempotencyKey, lookupIdempotencyRunId } from "@/lib/engine/idempotency";
import { workflowQueue } from "@/lib/queue/workflows.queue";
import { fromError, ok } from "@/lib/utils/api";
import { WebhookVerificationError } from "@/lib/utils/errors";
import { verifySignature } from "@/lib/webhooks/signature";

export async function POST(request: NextRequest, { params }: { params: { endpointId: string } }) {
  try {
    const endpoint = await db.query.webhookEndpoints.findFirst({
      where: and(eq(webhookEndpoints.id, params.endpointId), eq(webhookEndpoints.isActive, true)),
    });

    if (!endpoint) {
      return ok(null);
    }

    const rawBody = await request.text();
    const signature = request.headers.get("x-flowpilot-signature") ?? "";
    const externalIdempotency = request.headers.get("x-idempotency-key") ?? undefined;

    const valid = verifySignature(rawBody, signature, endpoint.signingSecret);
    if (!valid) {
      throw new WebhookVerificationError();
    }

    const idempotencyKey = generateWebhookIdempotencyKey({
      endpointId: endpoint.id,
      body: rawBody,
      headerKey: externalIdempotency,
    });

    const existingRunId = await lookupIdempotencyRunId(idempotencyKey, endpoint.tenantId);
    if (existingRunId) {
      return ok({ runId: existingRunId }, 202);
    }

    const workflow = await db.query.workflows.findFirst({ where: eq(workflows.id, endpoint.workflowId) });
    if (!workflow) {
      return ok(null);
    }

    const triggerData = rawBody ? (JSON.parse(rawBody) as Record<string, unknown>) : {};

    const [run] = await db
      .insert(workflowRuns)
      .values({
        workflowId: workflow.id,
        tenantId: endpoint.tenantId,
        triggeredBy: "webhook",
        triggerData,
        idempotencyKey,
        status: "pending",
      })
      .returning();

    await workflowQueue.add(`webhook-${run.id}`, {
      runId: run.id,
      workflowId: workflow.id,
      tenantId: endpoint.tenantId,
      triggerData,
      idempotencyKey,
      workflowVersion: workflow.version,
    });

    await db.insert(eventLog).values({
      tenantId: endpoint.tenantId,
      eventType: "webhook.received",
      entityType: "webhook",
      entityId: endpoint.id,
      payload: {
        workflowId: workflow.id,
        runId: run.id,
      },
    });

    await db.update(webhookEndpoints).set({ lastTriggered: new Date() }).where(eq(webhookEndpoints.id, endpoint.id));

    return ok({ runId: run.id }, 202);
  } catch (error: unknown) {
    return fromError(error);
  }
}
