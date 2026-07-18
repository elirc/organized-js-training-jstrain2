# Guide: src/app/api/admin/metrics/route.ts

## Purpose
This file defines a server API route. It handles HTTP requests, validates and transforms input, coordinates database/service calls, and returns a standardized response envelope.

## Line-by-line walkthrough

### Imports (what and why)
- L1: `import { and, eq, sql } from "drizzle-orm";` imports from `drizzle-orm` so this module can use that dependency.
- L2: `import { NextRequest } from "next/server";` imports from `next/server` so this module can use that dependency.
- L3: `import { db } from "@/lib/db";` imports from `@/lib/db` so this module can use that dependency.
- L4: `import { deadLetterItems, workflowRuns } from "@/lib/db/schema";` imports from `@/lib/db/schema` so this module can use that dependency.
- L5: `import { workflowQueue } from "@/lib/queue/workflows.queue";` imports from `@/lib/queue/workflows.queue` so this module can use that dependency.
- L6: `import { requireTenantContext } from "@/lib/auth/tenant";` imports from `@/lib/auth/tenant` so this module can use that dependency.
- L7: `import { fromError, ok } from "@/lib/utils/api";` imports from `@/lib/utils/api` so this module can use that dependency.

### Functions and components
- L9: **GET** (exported async function) - signature: `export async function GET(_request: NextRequest) {`.

### Ordered walkthrough
- L1: `import { and, eq, sql } from "drizzle-orm";` - Imports a dependency so this module can use external functionality.
- L2: `import { NextRequest } from "next/server";` - Imports a dependency so this module can use external functionality.
- L3: `import { db } from "@/lib/db";` - Imports a dependency so this module can use external functionality.
- L4: `import { deadLetterItems, workflowRuns } from "@/lib/db/schema";` - Imports a dependency so this module can use external functionality.
- L5: `import { workflowQueue } from "@/lib/queue/workflows.queue";` - Imports a dependency so this module can use external functionality.
- L6: `import { requireTenantContext } from "@/lib/auth/tenant";` - Imports a dependency so this module can use external functionality.
- L7: `import { fromError, ok } from "@/lib/utils/api";` - Imports a dependency so this module can use external functionality.
- L9: `export async function GET(_request: NextRequest) {` - Defines a function entrypoint that encapsulates one unit of behavior.
- L10: `try {` - Starts guarded execution for operations that may throw.
- L11: `const { tenantId } = await requireTenantContext();` - Declares a constant used to hold configuration, state, or helper logic in this scope.
- L13: `const [runCount] = await db` - Declares a constant used to hold configuration, state, or helper logic in this scope.
- L14: `.select({ count: sql<number>\`count(*)\` })` - Interacts with the database; this is a persistent side effect.
- L15: `.from(workflowRuns)` - Contributes to the local implementation details in this scope.
- L16: `.where(eq(workflowRuns.tenantId, tenantId));` - Contributes to the local implementation details in this scope.
- L18: `const [successCount] = await db` - Declares a constant used to hold configuration, state, or helper logic in this scope.
- L19: `.select({ count: sql<number>\`count(*)\` })` - Interacts with the database; this is a persistent side effect.
- L20: `.from(workflowRuns)` - Contributes to the local implementation details in this scope.
- L21: `.where(and(eq(workflowRuns.tenantId, tenantId), eq(workflowRuns.status, "completed")));` - Contributes to the local implementation details in this scope.
- L23: `const [deadCount] = await db` - Declares a constant used to hold configuration, state, or helper logic in this scope.
- L24: `.select({ count: sql<number>\`count(*)\` })` - Interacts with the database; this is a persistent side effect.
- L25: `.from(deadLetterItems)` - Contributes to the local implementation details in this scope.
- L26: `.where(eq(deadLetterItems.status, "pending"));` - Contributes to the local implementation details in this scope.
- L28: `const queueCounts = await workflowQueue.getJobCounts("waiting", "active", "delayed", "failed", "completed");` - Declares a constant used to hold configuration, state, or helper logic in this scope.
- L30: `const totalRuns = Number(runCount.count ?? 0);` - Declares a constant used to hold configuration, state, or helper logic in this scope.
- L31: `const totalSuccess = Number(successCount.count ?? 0);` - Declares a constant used to hold configuration, state, or helper logic in this scope.
- L33: `return ok({` - Builds an HTTP response object returned to the client.
- L34: `totalRuns,` - Contributes to the local implementation details in this scope.
- L35: `successRate: totalRuns > 0 ? Math.round((totalSuccess / totalRuns) * 100) : 0,` - Contributes to the local implementation details in this scope.
- L36: `deadLetterCount: Number(deadCount.count ?? 0),` - Contributes to the local implementation details in this scope.
- L37: `queue: queueCounts,` - Contributes to the local implementation details in this scope.
- L38: `});` - Contributes to the local implementation details in this scope.
- L39: `} catch (error: unknown) {` - Contributes to the local implementation details in this scope.
- L40: `return fromError(error);` - Returns data/UI to the caller, ending the current function path.
- L41: `}` - Contributes to the local implementation details in this scope.
- L42: `}` - Contributes to the local implementation details in this scope.

### State management
This file is mostly stateless. Most values are local constants or function parameters.

### Scope and closures
- L11: Module/function-scoped constant provides stable reference.
- L13: Module/function-scoped constant provides stable reference.
- L18: Module/function-scoped constant provides stable reference.
- L23: Module/function-scoped constant provides stable reference.
- L28: Module/function-scoped constant provides stable reference.
- L30: Module/function-scoped constant provides stable reference.
- L31: Module/function-scoped constant provides stable reference.

### Control flow
- L10: Protected block for expected fallible operations.

### Side effects
No major external side effects; this file mostly shapes data or UI.

### TypeScript types and contracts
Type usage is light here; contracts are mostly inferred from function signatures and library types.

## Concepts taught by this file
- api route handler
- database modeling with ORM
- background job processing
- error handling strategy
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
- async/await control flow: search for "JavaScript async await error handling"
