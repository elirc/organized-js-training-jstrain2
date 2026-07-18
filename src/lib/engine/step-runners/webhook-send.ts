import { db } from "@/lib/db";
import { webhookDeliveries } from "@/lib/db/schema";
import { signPayload } from "@/lib/webhooks/signature";
import { StepExecutionError } from "@/lib/utils/errors";
import type { StepInput, StepOutput, StepRunner } from "@/lib/engine/step-runners/types";

export class WebhookSendRunner implements StepRunner {
  async execute(input: StepInput, config: Record<string, unknown>): Promise<StepOutput> {
    const url = typeof config.url === "string" ? config.url : "";
    const method = typeof config.method === "string" ? config.method : "POST";
    const signingSecret = typeof config.signingSecret === "string" ? config.signingSecret : "";
    const headers = typeof config.headers === "object" && config.headers ? (config.headers as Record<string, string>) : {};

    if (!url || !signingSecret) {
      throw new StepExecutionError("webhook_send requires url and signingSecret", "WEBHOOK_SEND_CONFIG_ERROR");
    }

    const payload = JSON.stringify(input.data);
    const signature = signPayload(payload, signingSecret);

    try {
      const response = await fetch(url, {
        method,
        headers: {
          "content-type": "application/json",
          "x-flowpilot-signature": signature,
          "x-flowpilot-timestamp": new Date().toISOString(),
          ...headers,
        },
        body: payload,
      });

      const responseBody = await response.text();

      await db.insert(webhookDeliveries).values({
        runId: input.metadata.runId,
        url,
        method,
        headers,
        requestBody: input.data,
        responseStatus: response.status,
        responseBody,
        signature,
        attempt: input.metadata.attempt,
        status: response.ok ? "success" : "failed",
      });

      if (!response.ok) {
        throw new StepExecutionError(`Outbound webhook failed (${response.status})`, `HTTP_${response.status}`);
      }

      return {
        data: {
          status: response.status,
          responseBody,
        },
      };
    } catch (error: unknown) {
      if (error instanceof StepExecutionError) {
        throw error;
      }
      throw new StepExecutionError(
        error instanceof Error ? error.message : "Outbound webhook failed",
        "WEBHOOK_DELIVERY_ERROR",
      );
    }
  }
}
