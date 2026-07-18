import { StepExecutionError } from "@/lib/utils/errors";
import type { StepInput, StepOutput, StepRunner } from "@/lib/engine/step-runners/types";

export class HttpRequestRunner implements StepRunner {
  async execute(input: StepInput, config: Record<string, unknown>): Promise<StepOutput> {
    const url = typeof config.url === "string" ? config.url : "";
    const method = typeof config.method === "string" ? config.method : "POST";
    const headers = typeof config.headers === "object" && config.headers ? (config.headers as Record<string, string>) : {};
    const expectedStatus = typeof config.expectedStatus === "number" ? config.expectedStatus : undefined;
    const timeoutMs = typeof config.timeoutMs === "number" ? config.timeoutMs : 10000;

    if (!url) {
      throw new StepExecutionError("HTTP request URL is required", "HTTP_CONFIG_ERROR");
    }

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), timeoutMs);

    try {
      const body = config.body === undefined ? undefined : JSON.stringify(config.body);
      const response = await fetch(url, {
        method,
        headers: {
          "content-type": "application/json",
          ...headers,
        },
        body,
        signal: controller.signal,
      });

      const text = await response.text();

      if (expectedStatus !== undefined && response.status !== expectedStatus) {
        throw new StepExecutionError(
          `Unexpected status code ${response.status}, expected ${expectedStatus}`,
          `HTTP_${response.status}`,
        );
      }

      if (!response.ok) {
        throw new StepExecutionError(`Request failed with ${response.status}`, `HTTP_${response.status}`);
      }

      return {
        data: {
          status: response.status,
          responseText: text,
        },
      };
    } catch (error: unknown) {
      if (error instanceof DOMException && error.name === "AbortError") {
        throw new StepExecutionError("HTTP request timeout", "STEP_TIMEOUT");
      }
      if (error instanceof StepExecutionError) {
        throw error;
      }
      throw new StepExecutionError(error instanceof Error ? error.message : "HTTP request failed", "HTTP_REQUEST_ERROR");
    } finally {
      clearTimeout(timeout);
    }
  }
}
