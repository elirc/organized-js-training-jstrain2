import type { RunContext } from "@/lib/engine/context";

export interface StepInput {
  data: Record<string, unknown>;
  metadata: {
    runId: string;
    stepId: string;
    attempt: number;
  };
}

export interface StepOutput {
  data: Record<string, unknown>;
  metadata?: Record<string, unknown>;
}

export interface StepRunner {
  execute(input: StepInput, config: Record<string, unknown>, context: RunContext): Promise<StepOutput>;
}
