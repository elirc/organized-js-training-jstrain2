# Guide: src/app/api/workflows/[id]/route.ts

> **Known gap in PUT (checked against this snapshot on 2026-10-06).** The walkthrough below matches the code here line for line. Note that PUT writes in three separate statements on `db`: the parent `update` (lines 37-49), the step `delete` (line 56) and the step `insert` (lines 58-72). They are not wrapped in `db.transaction`. If the insert fails (for example, a step that breaks a constraint), the workflow keeps its bumped `version` and has lost all of its old steps, and the client gets an error. The maintained repo, [elirc/jstrain2](https://github.com/elirc/jstrain2), later moved all three writes onto `tx` inside `db.transaction`.

## Purpose
This file defines a server API route. It handles HTTP requests, validates and transforms input, coordinates database/service calls, and returns a standardized response envelope.

## Line-by-line walkthrough

### Imports (what and why)
- L1: `import { and, asc, eq, sql } from "drizzle-orm";` imports from `drizzle-orm` so this module can use that dependency.
- L2: `import { NextRequest } from "next/server";` imports from `next/server` so this module can use that dependency.
- L3: `import { db } from "@/lib/db";` imports from `@/lib/db` so this module can use that dependency.
- L4: `import { workflowSteps, workflows } from "@/lib/db/schema";` imports from `@/lib/db/schema` so this module can use that dependency.
- L5: `import { requireTenantContext } from "@/lib/auth/tenant";` imports from `@/lib/auth/tenant` so this module can use that dependency.
- L6: `import { fromError, ok } from "@/lib/utils/api";` imports from `@/lib/utils/api` so this module can use that dependency.
- L7: `import { workflowUpdateSchema } from "@/lib/validators/workflow.schema";` imports from `@/lib/validators/workflow.schema` so this module can use that dependency.

### Functions and components
- L9: **GET** (exported async function) - signature: `export async function GET(_request: NextRequest, { params }: { params: { id: string } }) {`.
- L32: **PUT** (exported async function) - signature: `export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {`.
- L82: **DELETE** (exported async function) - signature: `export async function DELETE(_request: NextRequest, { params }: { params: { id: string } }) {`.

### Ordered walkthrough
- L1: `import { and, asc, eq, sql } from "drizzle-orm";` - Imports a dependency so this module can use external functionality.
- L2: `import { NextRequest } from "next/server";` - Imports a dependency so this module can use external functionality.
- L3: `import { db } from "@/lib/db";` - Imports a dependency so this module can use external functionality.
- L4: `import { workflowSteps, workflows } from "@/lib/db/schema";` - Imports a dependency so this module can use external functionality.
- L5: `import { requireTenantContext } from "@/lib/auth/tenant";` - Imports a dependency so this module can use external functionality.
- L6: `import { fromError, ok } from "@/lib/utils/api";` - Imports a dependency so this module can use external functionality.
- L7: `import { workflowUpdateSchema } from "@/lib/validators/workflow.schema";` - Imports a dependency so this module can use external functionality.
- L9: `export async function GET(_request: NextRequest, { params }: { params: { id: string } }) {` - Defines a function entrypoint that encapsulates one unit of behavior.
- L10: `try {` - Starts guarded execution for operations that may throw.
- L11: `const { tenantId } = await requireTenantContext();` - Declares a constant used to hold configuration, state, or helper logic in this scope.
- L13: `const workflow = await db.query.workflows.findFirst({` - Declares a constant used to hold configuration, state, or helper logic in this scope.
- L14: `where: and(eq(workflows.id, params.id), eq(workflows.tenantId, tenantId)),` - Contributes to the local implementation details in this scope.
- L15: `});` - Contributes to the local implementation details in this scope.
- L17: `if (!workflow) {` - Branches control flow so different code paths run under different conditions.
- L18: `return ok(null);` - Builds an HTTP response object returned to the client.
- L19: `}` - Contributes to the local implementation details in this scope.
- L21: `const steps = await db.query.workflowSteps.findMany({` - Declares a constant used to hold configuration, state, or helper logic in this scope.
- L22: `where: eq(workflowSteps.workflowId, workflow.id),` - Contributes to the local implementation details in this scope.
- L23: `orderBy: [asc(workflowSteps.position)],` - Contributes to the local implementation details in this scope.
- L24: `});` - Contributes to the local implementation details in this scope.
- L26: `return ok({ workflow, steps });` - Builds an HTTP response object returned to the client.
- L27: `} catch (error: unknown) {` - Contributes to the local implementation details in this scope.
- L28: `return fromError(error);` - Returns data/UI to the caller, ending the current function path.
- L29: `}` - Contributes to the local implementation details in this scope.
- L30: `}` - Contributes to the local implementation details in this scope.
- L32: `export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {` - Defines a function entrypoint that encapsulates one unit of behavior.
- L33: `try {` - Starts guarded execution for operations that may throw.
- L34: `const { tenantId } = await requireTenantContext();` - Declares a constant used to hold configuration, state, or helper logic in this scope.
- L35: `const payload = workflowUpdateSchema.parse(await request.json());` - Declares a constant used to hold configuration, state, or helper logic in this scope.
- L37: `const [updated] = await db` - Declares a constant used to hold configuration, state, or helper logic in this scope.
- L38: `.update(workflows)` - Interacts with the database; this is a persistent side effect.
- L39: `.set({` - Contributes to the local implementation details in this scope.
- L40: `name: payload.name,` - Contributes to the local implementation details in this scope.
- L41: `description: payload.description,` - Contributes to the local implementation details in this scope.
- L42: `triggerType: payload.triggerType,` - Contributes to the local implementation details in this scope.
- L43: `triggerConfig: payload.triggerConfig,` - Contributes to the local implementation details in this scope.
- L44: `isActive: payload.isActive,` - Contributes to the local implementation details in this scope.
- L45: `updatedAt: new Date(),` - Contributes to the local implementation details in this scope.
- L46: `version: sql\`${workflows.version} + 1\`,` - Contributes to the local implementation details in this scope.
- L47: `})` - Contributes to the local implementation details in this scope.
- L48: `.where(and(eq(workflows.id, params.id), eq(workflows.tenantId, tenantId)))` - Contributes to the local implementation details in this scope.
- L49: `.returning();` - Contributes to the local implementation details in this scope.
- L51: `if (!updated) {` - Branches control flow so different code paths run under different conditions.
- L52: `return ok(null);` - Builds an HTTP response object returned to the client.
- L53: `}` - Contributes to the local implementation details in this scope.
- L55: `if (payload.steps) {` - Branches control flow so different code paths run under different conditions.
- L56: `await db.delete(workflowSteps).where(eq(workflowSteps.workflowId, updated.id));` - Interacts with the database; this is a persistent side effect.
- L57: `if (payload.steps.length > 0) {` - Branches control flow so different code paths run under different conditions.
- L58: `await db.insert(workflowSteps).values(` - Interacts with the database; this is a persistent side effect.
- L59: `payload.steps.map((step) => ({` - Contributes to the local implementation details in this scope.
- L60: `workflowId: updated.id,` - Contributes to the local implementation details in this scope.
- L61: `stepType: step.stepType,` - Contributes to the local implementation details in this scope.
- L62: `name: step.name,` - Contributes to the local implementation details in this scope.
- L63: `position: step.position,` - Contributes to the local implementation details in this scope.
- L64: `config: step.config,` - Contributes to the local implementation details in this scope.
- L65: `inputMapping: step.inputMapping,` - Contributes to the local implementation details in this scope.
- L66: `timeoutMs: step.timeoutMs,` - Contributes to the local implementation details in this scope.
- L67: `retryConfig: step.retryConfig,` - Contributes to the local implementation details in this scope.
- L68: `onFailure: step.onFailure,` - Contributes to the local implementation details in this scope.
- L69: `nextStepId: step.nextStepId,` - Contributes to the local implementation details in this scope.
- L70: `conditionBranches: step.conditionBranches ?? null,` - Contributes to the local implementation details in this scope.
- L71: `})),` - Contributes to the local implementation details in this scope.
- L72: `);` - Contributes to the local implementation details in this scope.
- L73: `}` - Contributes to the local implementation details in this scope.
- L74: `}` - Contributes to the local implementation details in this scope.
- L76: `return ok(updated);` - Builds an HTTP response object returned to the client.
- L77: `} catch (error: unknown) {` - Contributes to the local implementation details in this scope.
- L78: `return fromError(error);` - Returns data/UI to the caller, ending the current function path.
- L79: `}` - Contributes to the local implementation details in this scope.
- L80: `}` - Contributes to the local implementation details in this scope.
- L82: `export async function DELETE(_request: NextRequest, { params }: { params: { id: string } }) {` - Defines a function entrypoint that encapsulates one unit of behavior.
- L83: `try {` - Starts guarded execution for operations that may throw.
- L84: `const { tenantId } = await requireTenantContext();` - Declares a constant used to hold configuration, state, or helper logic in this scope.
- L86: `const [updated] = await db` - Declares a constant used to hold configuration, state, or helper logic in this scope.
- L87: `.update(workflows)` - Interacts with the database; this is a persistent side effect.
- L88: `.set({ isActive: false, updatedAt: new Date() })` - Contributes to the local implementation details in this scope.
- L89: `.where(and(eq(workflows.id, params.id), eq(workflows.tenantId, tenantId)))` - Contributes to the local implementation details in this scope.
- L90: `.returning();` - Contributes to the local implementation details in this scope.
- L92: `return ok(updated ?? null);` - Builds an HTTP response object returned to the client.
- L93: `} catch (error: unknown) {` - Contributes to the local implementation details in this scope.
- L94: `return fromError(error);` - Returns data/UI to the caller, ending the current function path.
- L95: `}` - Contributes to the local implementation details in this scope.
- L96: `}` - Contributes to the local implementation details in this scope.

### State management
- L39: `.set({` affects state ownership or updates.
- L88: `.set({ isActive: false, updatedAt: new Date() })` affects state ownership or updates.

### Scope and closures
- L11: Module/function-scoped constant provides stable reference.
- L13: Module/function-scoped constant provides stable reference.
- L21: Module/function-scoped constant provides stable reference.
- L34: Module/function-scoped constant provides stable reference.
- L35: Module/function-scoped constant provides stable reference.
- L37: Module/function-scoped constant provides stable reference.
- L59: Callback closure captures variables from outer scope.
- L84: Module/function-scoped constant provides stable reference.

### Control flow
- L10: Protected block for expected fallible operations.
- L17: Conditional branch chooses behavior based on runtime input.
- L33: Protected block for expected fallible operations.
- L51: Conditional branch chooses behavior based on runtime input.
- L55: Conditional branch chooses behavior based on runtime input.
- L57: Conditional branch chooses behavior based on runtime input.
- L83: Protected block for expected fallible operations.

### Side effects
- L13: Database IO side effect.
- L21: Database IO side effect.
- L56: Database IO side effect.
- L58: Database IO side effect.

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

## Senior review notes (checked against this snapshot)
- **Partial writes in PUT.** `db` is a `node-postgres` pool (`src/lib/db/index.ts:8-13`), so each `await db...` on lines 37, 56 and 58 can run on a different pooled connection and commits on its own. Nothing under `src/` calls `db.transaction(...)` today. Wrapping the three writes in `await db.transaction(async (tx) => { ... })` and using `tx` instead of `db` inside makes them all-or-nothing.
- **"Not found" is a 200.** GET (line 18) and PUT (line 52) return `ok(null)` when the id does not exist or belongs to another tenant. The client cannot tell "missing" from "empty" by status code. That hides cross-tenant probing (good) but also hides typos in ids (bad); a 404 envelope would keep both properties.
- **No optimistic concurrency.** PUT bumps `version` with `sql\`${workflows.version} + 1\`` (line 46) but never compares it to a version the client sent, so two editors saving at once both succeed and the last write wins.
- **Malformed bodies become 500s.** `workflowUpdateSchema.parse(await request.json())` (line 35) throws `SyntaxError` or `ZodError`, and `fromError` (`src/lib/utils/api.ts:25-33`) maps anything that is not a `FlowPilotError` to `500 INTERNAL_ERROR`.
- **DELETE is a soft delete.** Lines 86-90 only set `isActive: false`; the row and its steps remain, and GET still returns them.

## Mini exercises
- **Goal:** make PUT all-or-nothing. Move the update, delete and insert into one `db.transaction` callback that uses `tx`.
  **Check:** `grep -n "db.transaction" "src/app/api/workflows/[id]/route.ts"` prints one line, and `grep -n "await db\.\(update\|delete\|insert\)" "src/app/api/workflows/[id]/route.ts"` prints nothing (before the change it prints lines 56 and 58).
- **Goal:** return 404 for a missing workflow. Replace the two `ok(null)` returns (lines 18 and 52) with a failure envelope.
  **Check:** with the dev server running, `GET /api/workflows/00000000-0000-0000-0000-000000000000` responds with status 404 and `success: false` instead of `200` with `data: null`.
- **Goal:** turn a malformed JSON body into a 400. Catch `SyntaxError` and `ZodError` before falling through to `fromError`.
  **Check:** sending `PUT` with body `{` returns status 400 with a validation error code, not `500 INTERNAL_ERROR`.
- **Goal:** detect lost updates. Add an expected `version` to `workflowUpdateSchema` (`src/lib/validators/workflow.schema.ts`), then add `eq(workflows.version, payload.version)` to the `where` on line 48.
  **Check:** two `PUT`s carrying the same old version: the first returns the updated row, the second returns your conflict response and the stored `version` went up by exactly one.

## Further reading
- api route handler: search for "Next.js Route Handlers tutorial"
- database modeling with ORM: search for "Drizzle ORM schema and relations"
- error handling strategy: search for "error handling best practices TypeScript backend"
- async/await control flow: search for "JavaScript async await error handling"
- configuration as code: search for "Twelve-Factor App config"
