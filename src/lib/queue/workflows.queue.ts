export interface QueueJob<T> {
  id: string;
  name: string;
  data: T;
  status: "waiting" | "active" | "delayed" | "failed" | "completed";
  attemptsMade: number;
  token?: string;
}

type QueueProcessor<T> = (job: QueueJob<T>) => Promise<void>;

class InMemoryQueue<T extends Record<string, unknown>> {
  private readonly jobs: QueueJob<T>[] = [];
  private processor: QueueProcessor<T> | null = null;

  constructor(private readonly queueName: string) {}

  async add(name: string, data: T): Promise<QueueJob<T>> {
    const job: QueueJob<T> = {
      id: crypto.randomUUID(),
      name,
      data,
      status: "waiting",
      attemptsMade: 0,
      token: crypto.randomUUID(),
    };
    this.jobs.push(job);

    if (this.processor) {
      await this.process(job);
    }

    return job;
  }

  async setProcessor(processor: QueueProcessor<T>): Promise<void> {
    this.processor = processor;

    for (const job of this.jobs.filter((entry) => entry.status === "waiting")) {
      await this.process(job);
    }
  }

  async getJobCounts(...statuses: Array<QueueJob<T>["status"]>): Promise<Record<string, number>> {
    const result: Record<string, number> = {};
    for (const status of statuses) {
      result[status] = this.jobs.filter((job) => job.status === status).length;
    }
    return result;
  }

  private async process(job: QueueJob<T>): Promise<void> {
    if (!this.processor) {
      return;
    }

    job.status = "active";
    job.attemptsMade += 1;

    try {
      await this.processor(job);
      if (job.status === "active") {
        job.status = "completed";
      }
    } catch {
      job.status = "failed";
    }
  }
}

export const workflowQueue = new InMemoryQueue<Record<string, unknown>>("workflow-execution");
export const maintenanceQueue = new InMemoryQueue<Record<string, unknown>>("maintenance");

export function getQueueName(): string {
  return "workflow-execution";
}
