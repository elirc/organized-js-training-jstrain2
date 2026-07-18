# Guide: src/lib/utils/errors.ts

## Purpose
This file contains shared utility logic used by multiple layers (API, engine, queue, and worker).

## Line-by-line walkthrough

### Imports (what and why)
- This file has no explicit imports (or uses runtime globals).

### Functions and components
- L1: **FlowPilotError** (exported class) - signature: `export class FlowPilotError extends Error {`.
- L11: **StepExecutionError** (exported class) - signature: `export class StepExecutionError extends FlowPilotError {`.
- L17: **ConcurrencyLimitError** (exported class) - signature: `export class ConcurrencyLimitError extends FlowPilotError {`.
- L23: **WebhookVerificationError** (exported class) - signature: `export class WebhookVerificationError extends FlowPilotError {`.
- L29: **IdempotencyConflictError** (exported class) - signature: `export class IdempotencyConflictError extends FlowPilotError {`.
- L35: **ValidationError** (exported class) - signature: `export class ValidationError extends FlowPilotError {`.

### Ordered walkthrough
- L1: `export class FlowPilotError extends Error {` - Defines a class that groups behavior and state under one abstraction.
- L2: `public readonly code: string;` - Contributes to the local implementation details in this scope.
- L4: `constructor(message: string, code: string) {` - Contributes to the local implementation details in this scope.
- L5: `super(message);` - Contributes to the local implementation details in this scope.
- L6: `this.name = this.constructor.name;` - Contributes to the local implementation details in this scope.
- L7: `this.code = code;` - Contributes to the local implementation details in this scope.
- L8: `}` - Contributes to the local implementation details in this scope.
- L9: `}` - Contributes to the local implementation details in this scope.
- L11: `export class StepExecutionError extends FlowPilotError {` - Defines a class that groups behavior and state under one abstraction.
- L12: `constructor(message: string, code = "STEP_EXECUTION_ERROR") {` - Contributes to the local implementation details in this scope.
- L13: `super(message, code);` - Contributes to the local implementation details in this scope.
- L14: `}` - Contributes to the local implementation details in this scope.
- L15: `}` - Contributes to the local implementation details in this scope.
- L17: `export class ConcurrencyLimitError extends FlowPilotError {` - Defines a class that groups behavior and state under one abstraction.
- L18: `constructor(message = "Tenant concurrency limit reached") {` - Contributes to the local implementation details in this scope.
- L19: `super(message, "CONCURRENCY_LIMIT_REACHED");` - Contributes to the local implementation details in this scope.
- L20: `}` - Contributes to the local implementation details in this scope.
- L21: `}` - Contributes to the local implementation details in this scope.
- L23: `export class WebhookVerificationError extends FlowPilotError {` - Defines a class that groups behavior and state under one abstraction.
- L24: `constructor(message = "Webhook signature verification failed") {` - Contributes to the local implementation details in this scope.
- L25: `super(message, "WEBHOOK_VERIFICATION_FAILED");` - Contributes to the local implementation details in this scope.
- L26: `}` - Contributes to the local implementation details in this scope.
- L27: `}` - Contributes to the local implementation details in this scope.
- L29: `export class IdempotencyConflictError extends FlowPilotError {` - Defines a class that groups behavior and state under one abstraction.
- L30: `constructor(message = "Duplicate idempotency key") {` - Contributes to the local implementation details in this scope.
- L31: `super(message, "IDEMPOTENCY_CONFLICT");` - Contributes to the local implementation details in this scope.
- L32: `}` - Contributes to the local implementation details in this scope.
- L33: `}` - Contributes to the local implementation details in this scope.
- L35: `export class ValidationError extends FlowPilotError {` - Defines a class that groups behavior and state under one abstraction.
- L36: `constructor(message = "Validation failed") {` - Contributes to the local implementation details in this scope.
- L37: `super(message, "VALIDATION_ERROR");` - Contributes to the local implementation details in this scope.
- L38: `}` - Contributes to the local implementation details in this scope.
- L39: `}` - Contributes to the local implementation details in this scope.

### State management
This file is mostly stateless. Most values are local constants or function parameters.

### Scope and closures
Scope is straightforward: module-level constants and function-local variables with no tricky closure behavior.

### Control flow
Control flow is mostly linear: input comes in, transformations run, and a value is returned.

### Side effects
No major external side effects; this file mostly shapes data or UI.

### TypeScript types and contracts
Type usage is light here; contracts are mostly inferred from function signatures and library types.

## Concepts taught by this file
- error handling strategy
- idempotency
- webhook signature security

## Common mistakes
- Changing this file without updating dependent modules.
- Ignoring edge-case error paths.
- Skipping tests/docs for behavior changes.

## Mini exercises
- Rename one variable to improve clarity, then explain why readability improved.
- Add one guard for invalid input and document expected behavior.
- Trace one value from input to output in this file and write the path as comments.

## Further reading
- error handling strategy: search for "error handling best practices TypeScript backend"
- idempotency: search for "API idempotency keys explained"
- webhook signature security: search for "HMAC webhook signature verification"
