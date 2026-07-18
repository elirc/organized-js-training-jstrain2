# Guide: src/types/run.ts

## Purpose
This file defines TypeScript types that shape data contracts between modules and reduce runtime bugs.

## Line-by-line walkthrough

### Imports (what and why)
- This file has no explicit imports (or uses runtime globals).

### Functions and components
- No named function/class declarations were detected; behavior may be configuration/data declarations.

### Ordered walkthrough
- L1: `export type RunStatus =` - Defines a TypeScript type alias used to make data contracts explicit.
- L2: `| "pending"` - Contributes to the local implementation details in this scope.
- L3: `| "running"` - Contributes to the local implementation details in this scope.
- L4: `| "completed"` - Contributes to the local implementation details in this scope.
- L5: `| "failed"` - Contributes to the local implementation details in this scope.
- L6: `| "cancelled"` - Contributes to the local implementation details in this scope.
- L7: `| "dead_letter";` - Contributes to the local implementation details in this scope.
- L9: `export interface WorkflowRun {` - Defines a TypeScript interface contract that constrains object shape at compile time.
- L10: `id: string;` - Contributes to the local implementation details in this scope.
- L11: `workflowId: string;` - Contributes to the local implementation details in this scope.
- L12: `tenantId: string;` - Contributes to the local implementation details in this scope.
- L13: `triggeredBy: "manual" | "webhook" | "schedule" | "replay";` - Contributes to the local implementation details in this scope.
- L14: `triggerData: Record<string, unknown>;` - Contributes to the local implementation details in this scope.
- L15: `idempotencyKey: string | null;` - Contributes to the local implementation details in this scope.
- L16: `status: RunStatus;` - Contributes to the local implementation details in this scope.
- L17: `startedAt: string | null;` - Contributes to the local implementation details in this scope.
- L18: `completedAt: string | null;` - Contributes to the local implementation details in this scope.
- L19: `durationMs: number | null;` - Contributes to the local implementation details in this scope.
- L20: `error: string | null;` - Contributes to the local implementation details in this scope.
- L21: `workflowVersion: number | null;` - Contributes to the local implementation details in this scope.
- L22: `contextData: Record<string, unknown>;` - Contributes to the local implementation details in this scope.
- L23: `}` - Contributes to the local implementation details in this scope.
- L25: `export interface StepLog {` - Defines a TypeScript interface contract that constrains object shape at compile time.
- L26: `id: string;` - Contributes to the local implementation details in this scope.
- L27: `runId: string;` - Contributes to the local implementation details in this scope.
- L28: `stepId: string;` - Contributes to the local implementation details in this scope.
- L29: `stepName: string;` - Contributes to the local implementation details in this scope.
- L30: `stepType: string;` - Contributes to the local implementation details in this scope.
- L31: `status: "pending" | "running" | "completed" | "failed" | "skipped" | "retrying";` - Contributes to the local implementation details in this scope.
- L32: `attempt: number;` - Contributes to the local implementation details in this scope.
- L33: `inputData: Record<string, unknown> | null;` - Contributes to the local implementation details in this scope.
- L34: `outputData: Record<string, unknown> | null;` - Contributes to the local implementation details in this scope.
- L35: `error: string | null;` - Contributes to the local implementation details in this scope.
- L36: `startedAt: string | null;` - Contributes to the local implementation details in this scope.
- L37: `completedAt: string | null;` - Contributes to the local implementation details in this scope.
- L38: `durationMs: number | null;` - Contributes to the local implementation details in this scope.
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
- L1: Type alias encodes domain vocabulary.
- L9: Interface defines structural contract.
- L14: Generic type parameter constrains data shape.
- L22: Generic type parameter constrains data shape.
- L25: Interface defines structural contract.
- L33: Generic type parameter constrains data shape.
- L34: Generic type parameter constrains data shape.

## Concepts taught by this file
- idempotency
- TypeScript type contracts

## Common mistakes
- Changing this file without updating dependent modules.
- Ignoring edge-case error paths.
- Skipping tests/docs for behavior changes.

## Mini exercises
- Rename one variable to improve clarity, then explain why readability improved.
- Add one guard for invalid input and document expected behavior.
- Trace one value from input to output in this file and write the path as comments.

## Further reading
- idempotency: search for "API idempotency keys explained"
- TypeScript type contracts: search for "TypeScript interfaces vs types"
