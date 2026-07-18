import { WorkflowExecutor } from "@/lib/engine/executor";
import type { WorkflowExecutionJob } from "@/lib/engine/executor";

export async function processWorkflowJob(job: WorkflowExecutionJob) {
  const executor = new WorkflowExecutor();
  return executor.run(job);
}
