export interface RetryOptions {
  maxRetries: number;
  backoffMs: number;
  backoffMultiplier: number;
}

export async function sleep(ms: number): Promise<void> {
  await new Promise((resolve) => setTimeout(resolve, ms));
}

export function computeBackoff(attempt: number, options: RetryOptions): number {
  return Math.round(options.backoffMs * options.backoffMultiplier ** Math.max(0, attempt - 1));
}
