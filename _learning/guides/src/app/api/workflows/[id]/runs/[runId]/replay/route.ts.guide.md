# Guide: src/app/api/workflows/[id]/runs/[runId]/replay/route.ts

## Purpose
This file defines a server API route. It handles HTTP requests, validates and transforms input, coordinates database/service calls, and returns a standardized response envelope.

## Line-by-line walkthrough

### Imports (what and why)
- L1: `import { and, eq } from "drizzle-orm";` imports from `drizzle-orm` so this module can use that dependency.
- L2: `import { NextRequest } from "next/server";` imports from `next/server` so this module can use that dependency.
- L3: `import { db } from "@/lib/db";` imports from `@/lib/db` so this module can use that dependency.
- L4: `import { workflowRuns, workflows } from "@/lib/db/schema";` imports from `@/lib/db/schema` so this module can use that dependency.
- L5: `import { generateWorkflowIdempotencyKey } from "@/lib/engine/idempotency";` imports from `@/lib/engine/idempotency` so this module can use that dependency.
- L6: `import { workflowQueue } from "@/lib/queue/workflows.queue";` imports from `@/lib/queue/workflows.queue` so this module can use that dependency.
- L7: `import { requireTenantContext } from "@/lib/auth/tenant";` imports from `@/lib/auth/tenant` so this module can use that dependency.
- L8: `import { fromError, ok } from "@/lib/utils/api";` imports from `@/lib/utils/api` so this module can use that dependency.

### Functions and components
- L10: **POST** (exported async function) - signature: `export async function POST(`.

### Ordered walkthrough
- L1: `import { and, eq } from "drizzle-orm";` - Imports a dependency so this module can use external functionality.
- L2: `import { NextRequest } from "next/server";` - Imports a dependency so this module can use external functionality.
- L3: `import { db } from "@/lib/db";` - Imports a dependency so this module can use external functionality.
- L4: `import { workflowRuns, workflows } from "@/lib/db/schema";` - Imports a dependency so this module can use external functionality.
- L5: `import { generateWorkflowIdempotencyKey } from "@/lib/engine/idempotency";` - Imports a dependency so this module can use external functionality.
- L6: `import { workflowQueue } from "@/lib/queue/workflows.queue";` - Imports a dependency so this module can use external functionality.
- L7: `import { requireTenantContext } from "@/lib/auth/tenant";` - Imports a dependency so this module can use external functionality.
- L8: `import { fromError, ok } from "@/lib/utils/api";` - Imports a dependency so this module can use external functionality.
- L10: `export async function POST(` - Defines a function entrypoint that encapsulates one unit of behavior.
- L11: `_request: NextRequest,` - Contributes to the local implementation details in this scope.
- L12: `{ params }: { params: { id: string; runId: string } },` - Contributes to the local implementation details in this scope.
- L13: `) {` - Contributes to the local implementation details in this scope.
- L14: `try {` - Starts guarded execution for operations that may throw.
- L15: `const { tenantId } = await requireTenantContext();` - Declares a constant used to hold configuration, state, or helper logic in this scope.
- L17: `const workflow = await db.query.workflows.findFirst({` - Declares a constant used to hold configuration, state, or helper logic in this scope.
- L18: `where: and(eq(workflows.id, params.id), eq(workflows.tenantId, tenantId)),` - Contributes to the local implementation details in this scope.
- L19: `});` - Contributes to the local implementation details in this scope.
- L21: `if (!workflow) {` - Branches control flow so different code paths run under different conditions.
- L22: `return ok(null);` - Builds an HTTP response object returned to the client.
- L23: `}` - Contributes to the local implementation details in this scope.
- L25: `const originalRun = await db.query.workflowRuns.findFirst({` - Declares a constant used to hold configuration, state, or helper logic in this scope.
- L26: `where: and(eq(workflowRuns.id, params.runId), eq(workflowRuns.workflowId, workflow.id)),` - Contributes to the local implementation details in this scope.
- L27: `});` - Contributes to the local implementation details in this scope.
- L29: `if (!originalRun) {` - Branches control flow so different code paths run under different conditions.
- L30: `return ok(null);` - Builds an HTTP response object returned to the client.
- L31: `}` - Contributes to the local implementation details in this scope.
- L33: `const idempotencyKey = generateWorkflowIdempotencyKey({` - Declares a constant used to hold configuration, state, or helper logic in this scope.
- L34: `workflowId: workflow.id,` - Contributes to the local implementation details in this scope.
- L35: `triggerData: originalRun.triggerData,` - Contributes to the local implementation details in this scope.
- L36: `});` - Contributes to the local implementation details in this scope.
- L38: `const [newRun] = await db` - Declares a constant used to hold configuration, state, or helper logic in this scope.
- L39: `.insert(workflowRuns)` - Interacts with the database; this is a persistent side effect.
- L40: `.values({` - Contributes to the local implementation details in this scope.
- L41: `workflowId: workflow.id,` - Contributes to the local implementation details in this scope.
- L42: `tenantId,` - Contributes to the local implementation details in this scope.
- L43: `triggeredBy: "replay",` - Contributes to the local implementation details in this scope.
- L44: `triggerData: originalRun.triggerData,` - Contributes to the local implementation details in this scope.
- L45: `idempotencyKey,` - Contributes to the local implementation details in this scope.
- L46: `workflowVersion: originalRun.workflowVersion,` - Contributes to the local implementation details in this scope.
- L47: `status: "pending",` - Contributes to the local implementation details in this scope.
- L48: `})` - Contributes to the local implementation details in this scope.
- L49: `.returning();` - Contributes to the local implementation details in this scope.
- L51: `await workflowQueue.add(\`replay-${newRun.id}\`, {` - Contributes to the local implementation details in this scope.
- L52: `runId: newRun.id,` - Contributes to the local implementation details in this scope.
- L53: `workflowId: workflow.id,` - Contributes to the local implementation details in this scope.
- L54: `tenantId,` - Contributes to the local implementation details in this scope.
- L55: `triggerData: originalRun.triggerData,` - Contributes to the local implementation details in this scope.
- L56: `idempotencyKey,` - Contributes to the local implementation details in this scope.
- L57: `workflowVersion: originalRun.workflowVersion ?? workflow.version,` - Contributes to the local implementation details in this scope.
- L58: `});` - Contributes to the local implementation details in this scope.
- L60: `return ok({ runId: newRun.id }, 202);` - Builds an HTTP response object returned to the client.
- L61: `} catch (error: unknown) {` - Contributes to the local implementation details in this scope.
- L62: `return fromError(error);` - Returns data/UI to the caller, ending the current function path.
- L63: `}` - Contributes to the local implementation details in this scope.
- L64: `}` - Contributes to the local implementation details in this scope.

### State management
This file is mostly stateless. Most values are local constants or function parameters.

### Scope and closures
- L15: Module/function-scoped constant provides stable reference.
- L17: Module/function-scoped constant provides stable reference.
- L25: Module/function-scoped constant provides stable reference.
- L33: Module/function-scoped constant provides stable reference.
- L38: Module/function-scoped constant provides stable reference.

### Control flow
- L14: Protected block for expected fallible operations.
- L21: Conditional branch chooses behavior based on runtime input.
- L29: Conditional branch chooses behavior based on runtime input.

### Side effects
- L17: Database IO side effect.
- L25: Database IO side effect.

### TypeScript types and contracts
Type usage is light here; contracts are mostly inferred from function signatures and library types.

## Concepts taught by this file
- api route handler
- database modeling with ORM
- background job processing
- error handling strategy
- idempotency
- async/await control flow

## Common mistakes
- Forgetting tenant/auth checks before querying data.
- Returning raw errors instead of normalized `{ success, error }` envelopes.
- Not validating request bodies, causing runtime failures deeper in the stack.

## Mini exercises
- Add one new validation rule to the request body and return a clear error code when it fails.
- Add cursor/limit support (or tighten it) and explain how it prevents heavy responses.
- Write a unit test that proves one unhappy path is handled correctly.

## Further reading
- api route handler: search for "Next.js Route Handlers tutorial"
- database modeling with ORM: search for "Drizzle ORM schema and relations"
- background job processing: search for "background workers and job queues Node.js"
- error handling strategy: search for "error handling best practices TypeScript backend"
- idempotency: search for "API idempotency keys explained"
- async/await control flow: search for "JavaScript async await error handling"
