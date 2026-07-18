export type StepType =
  | "http_request"
  | "transform"
  | "condition"
  | "delay"
  | "webhook_send"
  | "loop";

export interface RetryConfig {
  maxRetries: number;
  backoffMs: number;
  backoffMultiplier: number;
}

export interface WorkflowStep {
  id: string;
  workflowId: string;
  stepType: StepType;
  name: string;
  position: number;
  config: Record<string, unknown>;
  inputMapping: Record<string, unknown>;
  timeoutMs: number;
  retryConfig: RetryConfig;
  onFailure: "stop" | "continue" | `goto:${string}`;
  nextStepId: string | null;
  conditionBranches: Array<{ expression: string; nextStepId: string }> | null;
}
