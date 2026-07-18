import { sleep } from "@/lib/utils/retry";
import type { StepInput, StepOutput, StepRunner } from "@/lib/engine/step-runners/types";

export class DelayRunner implements StepRunner {
  async execute(_input: StepInput, config: Record<string, unknown>): Promise<StepOutput> {
    const delayMs = typeof config.delayMs === "number" ? config.delayMs : 1000;
    await sleep(delayMs);
    return {
      data: { delayedMs: delayMs },
    };
  }
}
