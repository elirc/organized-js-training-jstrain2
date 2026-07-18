import { VM } from "vm2";
import { StepExecutionError } from "@/lib/utils/errors";
import type { StepInput, StepOutput, StepRunner } from "@/lib/engine/step-runners/types";

export class TransformRunner implements StepRunner {
  async execute(input: StepInput, config: Record<string, unknown>): Promise<StepOutput> {
    const code = typeof config.code === "string" ? config.code : "return input;";

    try {
      const vm = new VM({
        timeout: 2000,
        sandbox: {
          input: input.data,
        },
      });

      const result = vm.run(`(function transform(){ ${code} })()`);

      if (result === undefined) {
        throw new StepExecutionError("Transform must return a value", "TRANSFORM_NO_RETURN");
      }

      return {
        data: {
          result,
        },
      };
    } catch (error: unknown) {
      throw new StepExecutionError(
        error instanceof Error ? error.message : "Transform execution failed",
        "TRANSFORM_RUNTIME_ERROR",
      );
    }
  }
}
