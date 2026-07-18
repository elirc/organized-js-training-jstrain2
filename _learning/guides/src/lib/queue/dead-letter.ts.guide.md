# Guide: src/lib/queue/dead-letter.ts

## Purpose
This file defines queue infrastructure that decouples request-time actions from background processing.

## Line-by-line walkthrough

### Imports (what and why)
- L1: `import { db } from "@/lib/db";` imports from `@/lib/db` so this module can use that dependency.
- L2: `import { deadLetterItems, eventLog, workflowRuns } from "@/lib/db/schema";` imports from `@/lib/db/schema` so this module can use that dependency.
- L3: `import { eq } from "drizzle-orm";` imports from `drizzle-orm` so this module can use that dependency.

### Functions and components
- L15: **saveDeadLetter** (exported async function) - signature: `export async function saveDeadLetter(input: DeadLetterInput): Promise<void> {`.

### Ordered walkthrough
- L1: `import { db } from "@/lib/db";` - Imports a dependency so this module can use external functionality.
- L2: `import { deadLetterItems, eventLog, workflowRuns } from "@/lib/db/schema";` - Imports a dependency so this module can use external functionality.
- L3: `import { eq } from "drizzle-orm";` - Imports a dependency so this module can use external functionality.
- L5: `interface DeadLetterInput {` - Defines a TypeScript interface contract that constrains object shape at compile time.
- L6: `runId: string;` - Contributes to the local implementation details in this scope.
- L7: `queueName: string;` - Contributes to the local implementation details in this scope.
- L8: `jobData: Record<string, unknown>;` - Contributes to the local implementation details in this scope.
- L9: `error: string;` - Contributes to the local implementation details in this scope.
- L10: `failureCount: number;` - Contributes to the local implementation details in this scope.
- L11: `stepLogId?: string;` - Contributes to the local implementation details in this scope.
- L12: `tenantId?: string;` - Contributes to the local implementation details in this scope.
- L13: `}` - Contributes to the local implementation details in this scope.
- L15: `export async function saveDeadLetter(input: DeadLetterInput): Promise<void> {` - Defines a function entrypoint that encapsulates one unit of behavior.
- L16: `await db.insert(deadLetterItems).values({` - Interacts with the database; this is a persistent side effect.
- L17: `runId: input.runId,` - Contributes to the local implementation details in this scope.
- L18: `stepLogId: input.stepLogId,` - Contributes to the local implementation details in this scope.
- L19: `queueName: input.queueName,` - Contributes to the local implementation details in this scope.
- L20: `jobData: input.jobData,` - Contributes to the local implementation details in this scope.
- L21: `error: input.error,` - Contributes to the local implementation details in this scope.
- L22: `failureCount: input.failureCount,` - Contributes to the local implementation details in this scope.
- L23: `status: "pending",` - Contributes to the local implementation details in this scope.
- L24: `});` - Contributes to the local implementation details in this scope.
- L26: `await db` - Contributes to the local implementation details in this scope.
- L27: `.update(workflowRuns)` - Interacts with the database; this is a persistent side effect.
- L28: `.set({ status: "dead_letter", completedAt: new Date(), error: input.error })` - Contributes to the local implementation details in this scope.
- L29: `.where(eq(workflowRuns.id, input.runId));` - Contributes to the local implementation details in this scope.
- L31: `await db.insert(eventLog).values({` - Interacts with the database; this is a persistent side effect.
- L32: `tenantId: input.tenantId,` - Contributes to the local implementation details in this scope.
- L33: `eventType: "run.dead_lettered",` - Contributes to the local implementation details in this scope.
- L34: `entityType: "run",` - Contributes to the local implementation details in this scope.
- L35: `entityId: input.runId,` - Contributes to the local implementation details in this scope.
- L36: `payload: {` - Contributes to the local implementation details in this scope.
- L37: `queueName: input.queueName,` - Contributes to the local implementation details in this scope.
- L38: `failureCount: input.failureCount,` - Contributes to the local implementation details in this scope.
- L39: `},` - Contributes to the local implementation details in this scope.
- L40: `});` - Contributes to the local implementation details in this scope.
- L41: `}` - Contributes to the local implementation details in this scope.

### State management
- L28: `.set({ status: "dead_letter", completedAt: new Date(), error: input.error })` affects state ownership or updates.

### Scope and closures
Scope is straightforward: module-level constants and function-local variables with no tricky closure behavior.

### Control flow
Control flow is mostly linear: input comes in, transformations run, and a value is returned.

### Side effects
- L16: Database IO side effect.
- L31: Database IO side effect.

### TypeScript types and contracts
- L5: Interface defines structural contract.
- L8: Generic type parameter constrains data shape.
- L15: Promise return type signals async contract.

## Concepts taught by this file
- database modeling with ORM
- background job processing
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
- database modeling with ORM: search for "Drizzle ORM schema and relations"
- background job processing: search for "background workers and job queues Node.js"
- TypeScript type contracts: search for "TypeScript interfaces vs types"
- async/await control flow: search for "JavaScript async await error handling"
