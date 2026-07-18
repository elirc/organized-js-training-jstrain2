export type RunStatus =
  | "pending"
  | "running"
  | "completed"
  | "failed"
  | "cancelled"
  | "dead_letter";

export interface WorkflowRun {
  id: string;
  workflowId: string;
  tenantId: string;
  triggeredBy: "manual" | "webhook" | "schedule" | "replay";
  triggerData: Record<string, unknown>;
  idempotencyKey: string | null;
  status: RunStatus;
  startedAt: string | null;
  completedAt: string | null;
  durationMs: number | null;
  error: string | null;
  workflowVersion: number | null;
  contextData: Record<string, unknown>;
}

export interface StepLog {
  id: string;
  runId: string;
  stepId: string;
  stepName: string;
  stepType: string;
  status: "pending" | "running" | "completed" | "failed" | "skipped" | "retrying";
  attempt: number;
  inputData: Record<string, unknown> | null;
  outputData: Record<string, unknown> | null;
  error: string | null;
  startedAt: string | null;
  completedAt: string | null;
  durationMs: number | null;
}
