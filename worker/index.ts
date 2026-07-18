import { WorkflowExecutor } from "@/lib/engine/executor";
import { saveDeadLetter } from "@/lib/queue/dead-letter";
import { ConcurrencyLimitError } from "@/lib/utils/errors";
import type { WorkflowExecutionJob } from "@/lib/engine/executor";
import { workflowQueue } from "@/lib/queue/workflows.queue";

const executor = new WorkflowExecutor();

async function bootstrapWorker(): Promise<void> {
  await workflowQueue.setProcessor(async (job) => {
    const data = job.data as unknown as WorkflowExecutionJob;

    try {
      await executor.run(data);
    } catch (error: unknown) {
      if (error instanceof ConcurrencyLimitError) {
        job.status = "delayed";
        return;
      }

      await saveDeadLetter({
        runId: data.runId,
        queueName: "workflow-execution",
        jobData: data as unknown as Record<string, unknown>,
        error: error instanceof Error ? error.message : "Unknown error",
        failureCount: (job.attemptsMade ?? 0) + 1,
        tenantId: data.tenantId,
      });

      throw error;
    }
  });
}

bootstrapWorker().catch((error: unknown) => {
  console.error("Worker bootstrap failed", error);
  process.exit(1);
});

process.on("SIGINT", async () => {
  process.exit(0);
});
