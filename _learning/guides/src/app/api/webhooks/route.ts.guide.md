# Guide: src/app/api/webhooks/route.ts

## Purpose
This file defines a server API route. It handles HTTP requests, validates and transforms input, coordinates database/service calls, and returns a standardized response envelope.

## Line-by-line walkthrough

### Imports (what and why)
- L1: `import { eq } from "drizzle-orm";` imports from `drizzle-orm` so this module can use that dependency.
- L2: `import { NextRequest } from "next/server";` imports from `next/server` so this module can use that dependency.
- L3: `import { db } from "@/lib/db";` imports from `@/lib/db` so this module can use that dependency.
- L4: `import { webhookEndpoints, workflows } from "@/lib/db/schema";` imports from `@/lib/db/schema` so this module can use that dependency.
- L5: `import { requireTenantContext } from "@/lib/auth/tenant";` imports from `@/lib/auth/tenant` so this module can use that dependency.
- L6: `import { fromError, ok } from "@/lib/utils/api";` imports from `@/lib/utils/api` so this module can use that dependency.
- L7: `import { webhookEndpointCreateSchema } from "@/lib/validators/webhook.schema";` imports from `@/lib/validators/webhook.schema` so this module can use that dependency.

### Functions and components
- L9: **GET** (exported async function) - signature: `export async function GET() {`.
- L23: **POST** (exported async function) - signature: `export async function POST(request: NextRequest) {`.

### Ordered walkthrough
- L1: `import { eq } from "drizzle-orm";` - Imports a dependency so this module can use external functionality.
- L2: `import { NextRequest } from "next/server";` - Imports a dependency so this module can use external functionality.
- L3: `import { db } from "@/lib/db";` - Imports a dependency so this module can use external functionality.
- L4: `import { webhookEndpoints, workflows } from "@/lib/db/schema";` - Imports a dependency so this module can use external functionality.
- L5: `import { requireTenantContext } from "@/lib/auth/tenant";` - Imports a dependency so this module can use external functionality.
- L6: `import { fromError, ok } from "@/lib/utils/api";` - Imports a dependency so this module can use external functionality.
- L7: `import { webhookEndpointCreateSchema } from "@/lib/validators/webhook.schema";` - Imports a dependency so this module can use external functionality.
- L9: `export async function GET() {` - Defines a function entrypoint that encapsulates one unit of behavior.
- L10: `try {` - Starts guarded execution for operations that may throw.
- L11: `const { tenantId } = await requireTenantContext();` - Declares a constant used to hold configuration, state, or helper logic in this scope.
- L12: `const endpoints = await db.query.webhookEndpoints.findMany({` - Declares a constant used to hold configuration, state, or helper logic in this scope.
- L13: `where: eq(webhookEndpoints.tenantId, tenantId),` - Contributes to the local implementation details in this scope.
- L14: `orderBy: (table, { desc }) => [desc(table.createdAt)],` - Contributes to the local implementation details in this scope.
- L15: `});` - Contributes to the local implementation details in this scope.
- L17: `return ok({ items: endpoints });` - Builds an HTTP response object returned to the client.
- L18: `} catch (error: unknown) {` - Contributes to the local implementation details in this scope.
- L19: `return fromError(error);` - Returns data/UI to the caller, ending the current function path.
- L20: `}` - Contributes to the local implementation details in this scope.
- L21: `}` - Contributes to the local implementation details in this scope.
- L23: `export async function POST(request: NextRequest) {` - Defines a function entrypoint that encapsulates one unit of behavior.
- L24: `try {` - Starts guarded execution for operations that may throw.
- L25: `const { tenantId } = await requireTenantContext();` - Declares a constant used to hold configuration, state, or helper logic in this scope.
- L26: `const payload = webhookEndpointCreateSchema.parse(await request.json());` - Declares a constant used to hold configuration, state, or helper logic in this scope.
- L28: `const workflow = await db.query.workflows.findFirst({` - Declares a constant used to hold configuration, state, or helper logic in this scope.
- L29: `where: eq(workflows.id, payload.workflowId),` - Contributes to the local implementation details in this scope.
- L30: `});` - Contributes to the local implementation details in this scope.
- L32: `if (!workflow || workflow.tenantId !== tenantId) {` - Branches control flow so different code paths run under different conditions.
- L33: `return ok(null);` - Builds an HTTP response object returned to the client.
- L34: `}` - Contributes to the local implementation details in this scope.
- L36: `const [created] = await db` - Declares a constant used to hold configuration, state, or helper logic in this scope.
- L37: `.insert(webhookEndpoints)` - Interacts with the database; this is a persistent side effect.
- L38: `.values({` - Contributes to the local implementation details in this scope.
- L39: `tenantId,` - Contributes to the local implementation details in this scope.
- L40: `workflowId: payload.workflowId,` - Contributes to the local implementation details in this scope.
- L41: `path: payload.path,` - Contributes to the local implementation details in this scope.
- L42: `signingSecret: payload.signingSecret,` - Contributes to the local implementation details in this scope.
- L43: `isActive: payload.isActive,` - Contributes to the local implementation details in this scope.
- L44: `})` - Contributes to the local implementation details in this scope.
- L45: `.returning();` - Contributes to the local implementation details in this scope.
- L47: `return ok(created, 201);` - Builds an HTTP response object returned to the client.
- L48: `} catch (error: unknown) {` - Contributes to the local implementation details in this scope.
- L49: `return fromError(error);` - Returns data/UI to the caller, ending the current function path.
- L50: `}` - Contributes to the local implementation details in this scope.
- L51: `}` - Contributes to the local implementation details in this scope.

### State management
This file is mostly stateless. Most values are local constants or function parameters.

### Scope and closures
- L11: Module/function-scoped constant provides stable reference.
- L12: Module/function-scoped constant provides stable reference.
- L25: Module/function-scoped constant provides stable reference.
- L26: Module/function-scoped constant provides stable reference.
- L28: Module/function-scoped constant provides stable reference.
- L36: Module/function-scoped constant provides stable reference.

### Control flow
- L10: Protected block for expected fallible operations.
- L24: Protected block for expected fallible operations.
- L32: Conditional branch chooses behavior based on runtime input.

### Side effects
- L12: Database IO side effect.
- L28: Database IO side effect.

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
