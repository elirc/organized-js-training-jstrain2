import { ConditionRunner } from "@/lib/engine/step-runners/condition";
import { DelayRunner } from "@/lib/engine/step-runners/delay";
import { HttpRequestRunner } from "@/lib/engine/step-runners/http-request";
import { LoopRunner } from "@/lib/engine/step-runners/loop";
import { TransformRunner } from "@/lib/engine/step-runners/transform";
import type { StepRunner } from "@/lib/engine/step-runners/types";
import { WebhookSendRunner } from "@/lib/engine/step-runners/webhook-send";

const runners: Record<string, StepRunner> = {
  http_request: new HttpRequestRunner(),
  transform: new TransformRunner(),
  condition: new ConditionRunner(),
  delay: new DelayRunner(),
  webhook_send: new WebhookSendRunner(),
  loop: new LoopRunner(),
};

export function getStepRunner(stepType: string): StepRunner {
  const runner = runners[stepType];
  if (!runner) {
    throw new Error(`Unsupported step type: ${stepType}`);
  }
  return runner;
}
