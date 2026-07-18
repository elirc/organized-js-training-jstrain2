# Guide: worker/index.ts

## Purpose
This file belongs to the worker process that runs asynchronous jobs outside the web request lifecycle.

## Line-by-line walkthrough

### Imports (what and why)
- L1: `import { WorkflowExecutor } from "@/lib/engine/executor";` imports from `@/lib/engine/executor` so this module can use that dependency.
- L2: `import { saveDeadLetter } from "@/lib/queue/dead-letter";` imports from `@/lib/queue/dead-letter` so this module can use that dependency.
- L3: `import { ConcurrencyLimitError } from "@/lib/utils/errors";` imports from `@/lib/utils/errors` so this module can use that dependency.
- L4: `import type { WorkflowExecutionJob } from "@/lib/engine/executor";` imports from `@/lib/engine/executor` so this module can use that dependency.
- L5: `import { workflowQueue } from "@/lib/queue/workflows.queue";` imports from `@/lib/queue/workflows.queue` so this module can use that dependency.

### Functions and components
- L9: **bootstrapWorker** (async function) - signature: `async function bootstrapWorker(): Promise<void> {`.

### Ordered walkthrough
- L1: `import { WorkflowExecutor } from "@/lib/engine/executor";` - Imports a dependency so this module can use external functionality.
- L2: `import { saveDeadLetter } from "@/lib/queue/dead-letter";` - Imports a dependency so this module can use external functionality.
- L3: `import { ConcurrencyLimitError } from "@/lib/utils/errors";` - Imports a dependency so this module can use external functionality.
- L4: `import type { WorkflowExecutionJob } from "@/lib/engine/executor";` - Imports a dependency so this module can use external functionality.
- L5: `import { workflowQueue } from "@/lib/queue/workflows.queue";` - Imports a dependency so this module can use external functionality.
- L7: `const executor = new WorkflowExecutor();` - Declares a constant used to hold configuration, state, or helper logic in this scope.
- L9: `async function bootstrapWorker(): Promise<void> {` - Defines a function entrypoint that encapsulates one unit of behavior.
- L10: `await workflowQueue.setProcessor(async (job) => {` - Contributes to the local implementation details in this scope.
- L11: `const data = job.data as unknown as WorkflowExecutionJob;` - Declares a constant used to hold configuration, state, or helper logic in this scope.
- L13: `try {` - Starts guarded execution for operations that may throw.
- L14: `await executor.run(data);` - Contributes to the local implementation details in this scope.
- L15: `} catch (error: unknown) {` - Contributes to the local implementation details in this scope.
- L16: `if (error instanceof ConcurrencyLimitError) {` - Branches control flow so different code paths run under different conditions.
- L17: `job.status = "delayed";` - Contributes to the local implementation details in this scope.
- L18: `return;` - Contributes to the local implementation details in this scope.
- L19: `}` - Contributes to the local implementation details in this scope.
- L21: `await saveDeadLetter({` - Contributes to the local implementation details in this scope.
- L22: `runId: data.runId,` - Contributes to the local implementation details in this scope.
- L23: `queueName: "workflow-execution",` - Contributes to the local implementation details in this scope.
- L24: `jobData: data as unknown as Record<string, unknown>,` - Contributes to the local implementation details in this scope.
- L25: `error: error instanceof Error ? error.message : "Unknown error",` - Contributes to the local implementation details in this scope.
- L26: `failureCount: (job.attemptsMade ?? 0) + 1,` - Contributes to the local implementation details in this scope.
- L27: `tenantId: data.tenantId,` - Contributes to the local implementation details in this scope.
- L28: `});` - Contributes to the local implementation details in this scope.
- L30: `throw error;` - Contributes to the local implementation details in this scope.
- L31: `}` - Contributes to the local implementation details in this scope.
- L32: `});` - Contributes to the local implementation details in this scope.
- L33: `}` - Contributes to the local implementation details in this scope.
- L35: `bootstrapWorker().catch((error: unknown) => {` - Contributes to the local implementation details in this scope.
- L36: `console.error("Worker bootstrap failed", error);` - Contributes to the local implementation details in this scope.
- L37: `process.exit(1);` - Contributes to the local implementation details in this scope.
- L38: `});` - Contributes to the local implementation details in this scope.
- L40: `process.on("SIGINT", async () => {` - Contributes to the local implementation details in this scope.
- L41: `process.exit(0);` - Contributes to the local implementation details in this scope.
- L42: `});` - Contributes to the local implementation details in this scope.

### State management
- L10: `await workflowQueue.setProcessor(async (job) => {` affects state ownership or updates.

### Scope and closures
- L7: Module/function-scoped constant provides stable reference.
- L11: Module/function-scoped constant provides stable reference.

### Control flow
- L13: Protected block for expected fallible operations.
- L16: Conditional branch chooses behavior based on runtime input.

### Side effects
No major external side effects; this file mostly shapes data or UI.

### TypeScript types and contracts
- L9: Promise return type signals async contract.
- L24: Generic type parameter constrains data shape.

## Concepts taught by this file
- background job processing
- error handling strategy
- TypeScript type contracts
- async/await control flow

## Common mistakes
- Changing this file without updating dependent modules.
- Ignoring edge-case error paths.
- Skipping tests/docs for behavior changes.

## Mini exercises
- Rename one variable to improve clarity, then explain why readability improved.
- Add one guard for invalid input and document expected behavior.
- Trace one value from input to output in this file and write the path as comments.

## Further reading
- background job processing: search for "background workers and job queues Node.js"
- error handling strategy: search for "error handling best practices TypeScript backend"
- TypeScript type contracts: search for "TypeScript interfaces vs types"
- async/await control flow: search for "JavaScript async await error handling"
