export class FlowPilotError extends Error {
  public readonly code: string;

  constructor(message: string, code: string) {
    super(message);
    this.name = this.constructor.name;
    this.code = code;
  }
}

export class StepExecutionError extends FlowPilotError {
  constructor(message: string, code = "STEP_EXECUTION_ERROR") {
    super(message, code);
  }
}

export class ConcurrencyLimitError extends FlowPilotError {
  constructor(message = "Tenant concurrency limit reached") {
    super(message, "CONCURRENCY_LIMIT_REACHED");
  }
}

export class WebhookVerificationError extends FlowPilotError {
  constructor(message = "Webhook signature verification failed") {
    super(message, "WEBHOOK_VERIFICATION_FAILED");
  }
}

export class IdempotencyConflictError extends FlowPilotError {
  constructor(message = "Duplicate idempotency key") {
    super(message, "IDEMPOTENCY_CONFLICT");
  }
}

export class ValidationError extends FlowPilotError {
  constructor(message = "Validation failed") {
    super(message, "VALIDATION_ERROR");
  }
}
