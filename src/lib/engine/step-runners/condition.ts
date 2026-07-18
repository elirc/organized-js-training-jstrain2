import { StepExecutionError } from "@/lib/utils/errors";
import type { StepInput, StepOutput, StepRunner } from "@/lib/engine/step-runners/types";

function pickValue(source: Record<string, unknown>, path: string): unknown {
  const parts = path.split(".").filter(Boolean);
  let cursor: unknown = source;

  for (const part of parts) {
    if (!cursor || typeof cursor !== "object") {
      return undefined;
    }
    cursor = (cursor as Record<string, unknown>)[part];
  }

  return cursor;
}

function evaluateExpression(expression: string, input: Record<string, unknown>): boolean {
  const trimmed = expression.trim();

  if (trimmed.includes("==")) {
    const [left, right] = trimmed.split("==").map((part) => part.trim());
    const leftValue = pickValue(input, left);
    const rightValue = right.replace(/^['"]|['"]$/g, "");
    return String(leftValue) === rightValue;
  }

  if (trimmed.includes("!=")) {
    const [left, right] = trimmed.split("!=").map((part) => part.trim());
    const leftValue = pickValue(input, left);
    const rightValue = right.replace(/^['"]|['"]$/g, "");
    return String(leftValue) !== rightValue;
  }

  return Boolean(pickValue(input, trimmed));
}

export class ConditionRunner implements StepRunner {
  async execute(input: StepInput, config: Record<string, unknown>): Promise<StepOutput> {
    const expression = typeof config.expression === "string" ? config.expression : "true";

    try {
      const passed = expression === "true" ? true : evaluateExpression(expression, input.data);
      return {
        data: { passed },
      };
    } catch (error: unknown) {
      throw new StepExecutionError(
        error instanceof Error ? error.message : "Condition expression failed",
        "CONDITION_EVALUATION_ERROR",
      );
    }
  }
}
