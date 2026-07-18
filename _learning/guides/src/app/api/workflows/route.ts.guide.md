# Guide: src/app/api/workflows/route.ts

## Purpose
This file defines a server API route. It handles HTTP requests, validates and transforms input, coordinates database/service calls, and returns a standardized response envelope.

## Line-by-line walkthrough

### Imports (what and why)
- L1: `import { and, desc, eq, lt } from "drizzle-orm";` imports from `drizzle-orm` so this module can use that dependency.
- L2: `import { NextRequest } from "next/server";` imports from `next/server` so this module can use that dependency.
- L3: `import { db } from "@/lib/db";` imports from `@/lib/db` so this module can use that dependency.
- L4: `import { workflowSteps, workflows } from "@/lib/db/schema";` imports from `@/lib/db/schema` so this module can use that dependency.
- L5: `import { requireTenantContext } from "@/lib/auth/tenant";` imports from `@/lib/auth/tenant` so this module can use that dependency.
- L6: `import { fromError, ok } from "@/lib/utils/api";` imports from `@/lib/utils/api` so this module can use that dependency.
- L7: `import { paginationSchema, workflowCreateSchema } from "@/lib/validators/workflow.schema";` imports from `@/lib/validators/workflow.schema` so this module can use that dependency.

### Functions and components
- L9: **GET** (exported async function) - signature: `export async function GET(request: NextRequest) {`.
- L40: **POST** (exported async function) - signature: `export async function POST(request: NextRequest) {`.

### Ordered walkthrough
- L1: `import { and, desc, eq, lt } from "drizzle-orm";` - Imports a dependency so this module can use external functionality.
- L2: `import { NextRequest } from "next/server";` - Imports a dependency so this module can use external functionality.
- L3: `import { db } from "@/lib/db";` - Imports a dependency so this module can use external functionality.
- L4: `import { workflowSteps, workflows } from "@/lib/db/schema";` - Imports a dependency so this module can use external functionality.
- L5: `import { requireTenantContext } from "@/lib/auth/tenant";` - Imports a dependency so this module can use external functionality.
- L6: `import { fromError, ok } from "@/lib/utils/api";` - Imports a dependency so this module can use external functionality.
- L7: `import { paginationSchema, workflowCreateSchema } from "@/lib/validators/workflow.schema";` - Imports a dependency so this module can use external functionality.
- L9: `export async function GET(request: NextRequest) {` - Defines a function entrypoint that encapsulates one unit of behavior.
- L10: `try {` - Starts guarded execution for operations that may throw.
- L11: `const { tenantId } = await requireTenantContext();` - Declares a constant used to hold configuration, state, or helper logic in this scope.
- L12: `const query = paginationSchema.parse({` - Declares a constant used to hold configuration, state, or helper logic in this scope.
- L13: `cursor: request.nextUrl.searchParams.get("cursor") ?? undefined,` - Contributes to the local implementation details in this scope.
- L14: `limit: request.nextUrl.searchParams.get("limit") ?? undefined,` - Contributes to the local implementation details in this scope.
- L15: `});` - Contributes to the local implementation details in this scope.
- L17: `const items = await db.query.workflows.findMany({` - Declares a constant used to hold configuration, state, or helper logic in this scope.
- L18: `where: and(` - Contributes to the local implementation details in this scope.
- L19: `eq(workflows.tenantId, tenantId),` - Contributes to the local implementation details in this scope.
- L20: `query.cursor ? lt(workflows.id, query.cursor) : undefined,` - Contributes to the local implementation details in this scope.
- L21: `),` - Contributes to the local implementation details in this scope.
- L22: `orderBy: [desc(workflows.id)],` - Contributes to the local implementation details in this scope.
- L23: `limit: query.limit + 1,` - Contributes to the local implementation details in this scope.
- L24: `});` - Contributes to the local implementation details in this scope.
- L26: `const hasMore = items.length > query.limit;` - Declares a constant used to hold configuration, state, or helper logic in this scope.
- L27: `const sliced = hasMore ? items.slice(0, query.limit) : items;` - Declares a constant used to hold configuration, state, or helper logic in this scope.
- L29: `return ok({` - Builds an HTTP response object returned to the client.
- L30: `items: sliced,` - Contributes to the local implementation details in this scope.
- L31: `cursor: hasMore ? sliced[sliced.length - 1]?.id ?? null : null,` - Contributes to the local implementation details in this scope.
- L32: `limit: query.limit,` - Contributes to the local implementation details in this scope.
- L33: `hasMore,` - Contributes to the local implementation details in this scope.
- L34: `});` - Contributes to the local implementation details in this scope.
- L35: `} catch (error: unknown) {` - Contributes to the local implementation details in this scope.
- L36: `return fromError(error);` - Returns data/UI to the caller, ending the current function path.
- L37: `}` - Contributes to the local implementation details in this scope.
- L38: `}` - Contributes to the local implementation details in this scope.
- L40: `export async function POST(request: NextRequest) {` - Defines a function entrypoint that encapsulates one unit of behavior.
- L41: `try {` - Starts guarded execution for operations that may throw.
- L42: `const { tenantId, userId } = await requireTenantContext();` - Declares a constant used to hold configuration, state, or helper logic in this scope.
- L43: `const payload = workflowCreateSchema.parse(await request.json());` - Declares a constant used to hold configuration, state, or helper logic in this scope.
- L45: `const [created] = await db` - Declares a constant used to hold configuration, state, or helper logic in this scope.
- L46: `.insert(workflows)` - Interacts with the database; this is a persistent side effect.
- L47: `.values({` - Contributes to the local implementation details in this scope.
- L48: `tenantId,` - Contributes to the local implementation details in this scope.
- L49: `createdBy: userId,` - Contributes to the local implementation details in this scope.
- L50: `name: payload.name,` - Contributes to the local implementation details in this scope.
- L51: `description: payload.description ?? null,` - Contributes to the local implementation details in this scope.
- L52: `triggerType: payload.triggerType,` - Contributes to the local implementation details in this scope.
- L53: `triggerConfig: payload.triggerConfig,` - Contributes to the local implementation details in this scope.
- L54: `isActive: payload.isActive,` - Contributes to the local implementation details in this scope.
- L55: `})` - Contributes to the local implementation details in this scope.
- L56: `.returning();` - Contributes to the local implementation details in this scope.
- L58: `if (payload.steps.length > 0) {` - Branches control flow so different code paths run under different conditions.
- L59: `await db.insert(workflowSteps).values(` - Interacts with the database; this is a persistent side effect.
- L60: `payload.steps.map((step) => ({` - Contributes to the local implementation details in this scope.
- L61: `workflowId: created.id,` - Contributes to the local implementation details in this scope.
- L62: `stepType: step.stepType,` - Contributes to the local implementation details in this scope.
- L63: `name: step.name,` - Contributes to the local implementation details in this scope.
- L64: `position: step.position,` - Contributes to the local implementation details in this scope.
- L65: `config: step.config,` - Contributes to the local implementation details in this scope.
- L66: `inputMapping: step.inputMapping,` - Contributes to the local implementation details in this scope.
- L67: `timeoutMs: step.timeoutMs,` - Contributes to the local implementation details in this scope.
- L68: `retryConfig: step.retryConfig,` - Contributes to the local implementation details in this scope.
- L69: `onFailure: step.onFailure,` - Contributes to the local implementation details in this scope.
- L70: `nextStepId: step.nextStepId,` - Contributes to the local implementation details in this scope.
- L71: `conditionBranches: step.conditionBranches ?? null,` - Contributes to the local implementation details in this scope.
- L72: `})),` - Contributes to the local implementation details in this scope.
- L73: `);` - Contributes to the local implementation details in this scope.
- L74: `}` - Contributes to the local implementation details in this scope.
- L76: `return ok(created, 201);` - Builds an HTTP response object returned to the client.
- L77: `} catch (error: unknown) {` - Contributes to the local implementation details in this scope.
- L78: `return fromError(error);` - Returns data/UI to the caller, ending the current function path.
- L79: `}` - Contributes to the local implementation details in this scope.
- L80: `}` - Contributes to the local implementation details in this scope.

### State management
This file is mostly stateless. Most values are local constants or function parameters.

### Scope and closures
- L11: Module/function-scoped constant provides stable reference.
- L12: Module/function-scoped constant provides stable reference.
- L17: Module/function-scoped constant provides stable reference.
- L26: Module/function-scoped constant provides stable reference.
- L27: Module/function-scoped constant provides stable reference.
- L42: Module/function-scoped constant provides stable reference.
- L43: Module/function-scoped constant provides stable reference.
- L45: Module/function-scoped constant provides stable reference.

### Control flow
- L10: Protected block for expected fallible operations.
- L41: Protected block for expected fallible operations.
- L58: Conditional branch chooses behavior based on runtime input.

### Side effects
- L17: Database IO side effect.
- L59: Database IO side effect.

### TypeScript types and contracts
Type usage is light here; contracts are mostly inferred from function signatures and library types.

## Concepts taught by this file
- api route handler
- database modeling with ORM
- error handling strategy
- async/await control flow
- configuration as code

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
- configuration as code: search for "Twelve-Factor App config"
