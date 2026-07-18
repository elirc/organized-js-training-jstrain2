# Guide: src/app/api/workflows/[id]/runs/route.ts

## Purpose
This file defines a server API route. It handles HTTP requests, validates and transforms input, coordinates database/service calls, and returns a standardized response envelope.

## Line-by-line walkthrough

### Imports (what and why)
- L1: `import { and, desc, eq, lt } from "drizzle-orm";` imports from `drizzle-orm` so this module can use that dependency.
- L2: `import { NextRequest } from "next/server";` imports from `next/server` so this module can use that dependency.
- L3: `import { db } from "@/lib/db";` imports from `@/lib/db` so this module can use that dependency.
- L4: `import { workflowRuns, workflows } from "@/lib/db/schema";` imports from `@/lib/db/schema` so this module can use that dependency.
- L5: `import { requireTenantContext } from "@/lib/auth/tenant";` imports from `@/lib/auth/tenant` so this module can use that dependency.
- L6: `import { fromError, ok } from "@/lib/utils/api";` imports from `@/lib/utils/api` so this module can use that dependency.

### Functions and components
- L8: **GET** (exported async function) - signature: `export async function GET(request: NextRequest, { params }: { params: { id: string } }) {`.

### Ordered walkthrough
- L1: `import { and, desc, eq, lt } from "drizzle-orm";` - Imports a dependency so this module can use external functionality.
- L2: `import { NextRequest } from "next/server";` - Imports a dependency so this module can use external functionality.
- L3: `import { db } from "@/lib/db";` - Imports a dependency so this module can use external functionality.
- L4: `import { workflowRuns, workflows } from "@/lib/db/schema";` - Imports a dependency so this module can use external functionality.
- L5: `import { requireTenantContext } from "@/lib/auth/tenant";` - Imports a dependency so this module can use external functionality.
- L6: `import { fromError, ok } from "@/lib/utils/api";` - Imports a dependency so this module can use external functionality.
- L8: `export async function GET(request: NextRequest, { params }: { params: { id: string } }) {` - Defines a function entrypoint that encapsulates one unit of behavior.
- L9: `try {` - Starts guarded execution for operations that may throw.
- L10: `const { tenantId } = await requireTenantContext();` - Declares a constant used to hold configuration, state, or helper logic in this scope.
- L11: `const limit = Number(request.nextUrl.searchParams.get("limit") ?? "20");` - Declares a constant used to hold configuration, state, or helper logic in this scope.
- L12: `const cursor = request.nextUrl.searchParams.get("cursor") ?? undefined;` - Declares a constant used to hold configuration, state, or helper logic in this scope.
- L14: `const workflow = await db.query.workflows.findFirst({` - Declares a constant used to hold configuration, state, or helper logic in this scope.
- L15: `where: and(eq(workflows.id, params.id), eq(workflows.tenantId, tenantId)),` - Contributes to the local implementation details in this scope.
- L16: `});` - Contributes to the local implementation details in this scope.
- L18: `if (!workflow) {` - Branches control flow so different code paths run under different conditions.
- L19: `return ok({ items: [], cursor: null, limit, hasMore: false });` - Builds an HTTP response object returned to the client.
- L20: `}` - Contributes to the local implementation details in this scope.
- L22: `const runs = await db.query.workflowRuns.findMany({` - Declares a constant used to hold configuration, state, or helper logic in this scope.
- L23: `where: and(` - Contributes to the local implementation details in this scope.
- L24: `eq(workflowRuns.workflowId, workflow.id),` - Contributes to the local implementation details in this scope.
- L25: `eq(workflowRuns.tenantId, tenantId),` - Contributes to the local implementation details in this scope.
- L26: `cursor ? lt(workflowRuns.id, cursor) : undefined,` - Contributes to the local implementation details in this scope.
- L27: `),` - Contributes to the local implementation details in this scope.
- L28: `orderBy: [desc(workflowRuns.id)],` - Contributes to the local implementation details in this scope.
- L29: `limit: limit + 1,` - Contributes to the local implementation details in this scope.
- L30: `});` - Contributes to the local implementation details in this scope.
- L32: `const hasMore = runs.length > limit;` - Declares a constant used to hold configuration, state, or helper logic in this scope.
- L33: `const items = hasMore ? runs.slice(0, limit) : runs;` - Declares a constant used to hold configuration, state, or helper logic in this scope.
- L35: `return ok({` - Builds an HTTP response object returned to the client.
- L36: `items,` - Contributes to the local implementation details in this scope.
- L37: `cursor: hasMore ? items[items.length - 1]?.id ?? null : null,` - Contributes to the local implementation details in this scope.
- L38: `limit,` - Contributes to the local implementation details in this scope.
- L39: `hasMore,` - Contributes to the local implementation details in this scope.
- L40: `});` - Contributes to the local implementation details in this scope.
- L41: `} catch (error: unknown) {` - Contributes to the local implementation details in this scope.
- L42: `return fromError(error);` - Returns data/UI to the caller, ending the current function path.
- L43: `}` - Contributes to the local implementation details in this scope.
- L44: `}` - Contributes to the local implementation details in this scope.

### State management
This file is mostly stateless. Most values are local constants or function parameters.

### Scope and closures
- L10: Module/function-scoped constant provides stable reference.
- L11: Module/function-scoped constant provides stable reference.
- L12: Module/function-scoped constant provides stable reference.
- L14: Module/function-scoped constant provides stable reference.
- L22: Module/function-scoped constant provides stable reference.
- L32: Module/function-scoped constant provides stable reference.
- L33: Module/function-scoped constant provides stable reference.

### Control flow
- L9: Protected block for expected fallible operations.
- L18: Conditional branch chooses behavior based on runtime input.

### Side effects
- L14: Database IO side effect.
- L22: Database IO side effect.

### TypeScript types and contracts
Type usage is light here; contracts are mostly inferred from function signatures and library types.

## Concepts taught by this file
- api route handler
- database modeling with ORM
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
- error handling strategy: search for "error handling best practices TypeScript backend"
- async/await control flow: search for "JavaScript async await error handling"
