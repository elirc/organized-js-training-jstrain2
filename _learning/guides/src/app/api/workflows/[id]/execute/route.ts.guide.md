# Guide: src/app/api/workflows/[id]/execute/route.ts

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
- L10: **POST** (exported async function) - signature: `export async function POST(request: NextRequest, { params }: { params: { id: string } }) {`.
- L13: **payload** (arrow function) - signature: `const payload = (await request.json().catch(() => ({}))) as { triggerData?: Record<string, unknown>; idempotencyKey?: string };`.

### Ordered walkthrough
- L1: `import { and, eq } from "drizzle-orm";` - Imports a dependency so this module can use external functionality.
- L2: `import { NextRequest } from "next/server";` - Imports a dependency so this module can use external functionality.
- L3: `import { db } from "@/lib/db";` - Imports a dependency so this module can use external functionality.
- L4: `import { workflowRuns, workflows } from "@/lib/db/schema";` - Imports a dependency so this module can use external functionality.
- L5: `import { generateWorkflowIdempotencyKey } from "@/lib/engine/idempotency";` - Imports a dependency so this module can use external functionality.
- L6: `import { workflowQueue } from "@/lib/queue/workflows.queue";` - Imports a dependency so this module can use external functionality.
- L7: `import { requireTenantContext } from "@/lib/auth/tenant";` - Imports a dependency so this module can use external functionality.
- L8: `import { fromError, ok } from "@/lib/utils/api";` - Imports a dependency so this module can use external functionality.
- L10: `export async function POST(request: NextRequest, { params }: { params: { id: string } }) {` - Defines a function entrypoint that encapsulates one unit of behavior.
- L11: `try {` - Starts guarded execution for operations that may throw.
- L12: `const { tenantId } = await requireTenantContext();` - Declares a constant used to hold configuration, state, or helper logic in this scope.
- L13: `const payload = (await request.json().catch(() => ({}))) as { triggerData?: Record<string, unknown>; idempotencyKey?: string };` - Declares a constant used to hold configuration, state, or helper logic in this scope.
- L15: `const workflow = await db.query.workflows.findFirst({` - Declares a constant used to hold configuration, state, or helper logic in this scope.
- L16: `where: and(eq(workflows.id, params.id), eq(workflows.tenantId, tenantId)),` - Contributes to the local implementation details in this scope.
- L17: `});` - Contributes to the local implementation details in this scope.
- L19: `if (!workflow) {` - Branches control flow so different code paths run under different conditions.
- L20: `return ok(null);` - Builds an HTTP response object returned to the client.
- L21: `}` - Contributes to the local implementation details in this scope.
- L23: `const triggerData = payload.triggerData ?? {};` - Declares a constant used to hold configuration, state, or helper logic in this scope.
- L24: `const idempotencyKey =` - Declares a constant used to hold configuration, state, or helper logic in this scope.
- L25: `payload.idempotencyKey ??` - Contributes to the local implementation details in this scope.
- L26: `generateWorkflowIdempotencyKey({` - Contributes to the local implementation details in this scope.
- L27: `workflowId: workflow.id,` - Contributes to the local implementation details in this scope.
- L28: `triggerData,` - Contributes to the local implementation details in this scope.
- L29: `});` - Contributes to the local implementation details in this scope.
- L31: `const [run] = await db` - Declares a constant used to hold configuration, state, or helper logic in this scope.
- L32: `.insert(workflowRuns)` - Interacts with the database; this is a persistent side effect.
- L33: `.values({` - Contributes to the local implementation details in this scope.
- L34: `workflowId: workflow.id,` - Contributes to the local implementation details in this scope.
- L35: `tenantId,` - Contributes to the local implementation details in this scope.
- L36: `triggeredBy: "manual",` - Contributes to the local implementation details in this scope.
- L37: `triggerData,` - Contributes to the local implementation details in this scope.
- L38: `idempotencyKey,` - Contributes to the local implementation details in this scope.
- L39: `status: "pending",` - Contributes to the local implementation details in this scope.
- L40: `})` - Contributes to the local implementation details in this scope.
- L41: `.returning();` - Contributes to the local implementation details in this scope.
- L43: `await workflowQueue.add(\`run-${run.id}\`, {` - Contributes to the local implementation details in this scope.
- L44: `runId: run.id,` - Contributes to the local implementation details in this scope.
- L45: `workflowId: workflow.id,` - Contributes to the local implementation details in this scope.
- L46: `tenantId,` - Contributes to the local implementation details in this scope.
- L47: `triggerData,` - Contributes to the local implementation details in this scope.
- L48: `idempotencyKey,` - Contributes to the local implementation details in this scope.
- L49: `workflowVersion: workflow.version,` - Contributes to the local implementation details in this scope.
- L50: `});` - Contributes to the local implementation details in this scope.
- L52: `return ok({ runId: run.id }, 202);` - Builds an HTTP response object returned to the client.
- L53: `} catch (error: unknown) {` - Contributes to the local implementation details in this scope.
- L54: `return fromError(error);` - Returns data/UI to the caller, ending the current function path.
- L55: `}` - Contributes to the local implementation details in this scope.
- L56: `}` - Contributes to the local implementation details in this scope.

### State management
This file is mostly stateless. Most values are local constants or function parameters.

### Scope and closures
- L12: Module/function-scoped constant provides stable reference.
- L15: Module/function-scoped constant provides stable reference.
- L23: Module/function-scoped constant provides stable reference.
- L24: Module/function-scoped constant provides stable reference.
- L31: Module/function-scoped constant provides stable reference.

### Control flow
- L11: Protected block for expected fallible operations.
- L19: Conditional branch chooses behavior based on runtime input.

### Side effects
- L15: Database IO side effect.

### TypeScript types and contracts
- L13: Generic type parameter constrains data shape.

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
