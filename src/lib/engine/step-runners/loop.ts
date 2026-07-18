import type { StepInput, StepOutput, StepRunner } from "@/lib/engine/step-runners/types";

function getByPath(value: unknown, path: string): unknown {
  const parts = path.split(".").filter(Boolean);
  let current = value;

  for (const part of parts) {
    if (!current || typeof current !== "object") {
      return undefined;
    }
    current = (current as Record<string, unknown>)[part];
  }

  return current;
}

export class LoopRunner implements StepRunner {
  async execute(input: StepInput, config: Record<string, unknown>): Promise<StepOutput> {
    const arrayPath = typeof config.arrayPath === "string" ? config.arrayPath : "";
    const list = getByPath(input.data, arrayPath);

    if (!Array.isArray(list)) {
      return {
        data: {
          results: [],
        },
      };
    }

    return {
      data: {
        results: list.map((item) => ({ item })),
      },
    };
  }
}
