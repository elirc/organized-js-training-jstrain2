# Guide: src/lib/engine/idempotency.ts

## Purpose
This file is part of the workflow execution engine. It transforms workflow definitions into runtime behavior with retries, branching, and run logging.

## Line-by-line walkthrough

### Imports (what and why)
- L1: `import { and, eq, gt, sql } from "drizzle-orm";` imports from `drizzle-orm` so this module can use that dependency.
- L2: `import { db } from "@/lib/db";` imports from `@/lib/db` so this module can use that dependency.
- L3: `import { idempotencyKeys } from "@/lib/db/schema";` imports from `@/lib/db/schema` so this module can use that dependency.
- L4: `import { sha256 } from "@/lib/utils/crypto";` imports from `@/lib/utils/crypto` so this module can use that dependency.

### Functions and components
- L8: **generateWorkflowIdempotencyKey** (exported function) - signature: `export function generateWorkflowIdempotencyKey(params: {`.
- L21: **generateWebhookIdempotencyKey** (exported function) - signature: `export function generateWebhookIdempotencyKey(params: {`.
- L29: **lookupIdempotencyRunId** (exported async function) - signature: `export async function lookupIdempotencyRunId(key: string, tenantId: string): Promise<string | null> {`.
- L37: **reserveIdempotencyKey** (exported async function) - signature: `export async function reserveIdempotencyKey(params: {`.
- L60: **cleanupExpiredIdempotencyKeys** (exported async function) - signature: `export async function cleanupExpiredIdempotencyKeys(): Promise<number> {`.

### Ordered walkthrough
- L1: `import { and, eq, gt, sql } from "drizzle-orm";` - Imports a dependency so this module can use external functionality.
- L2: `import { db } from "@/lib/db";` - Imports a dependency so this module can use external functionality.
- L3: `import { idempotencyKeys } from "@/lib/db/schema";` - Imports a dependency so this module can use external functionality.
- L4: `import { sha256 } from "@/lib/utils/crypto";` - Imports a dependency so this module can use external functionality.
- L6: `const DEFAULT_TTL_HOURS = Number(process.env.IDEMPOTENCY_KEY_TTL_HOURS ?? "24");` - Declares a constant used to hold configuration, state, or helper logic in this scope.
- L8: `export function generateWorkflowIdempotencyKey(params: {` - Defines a function entrypoint that encapsulates one unit of behavior.
- L9: `workflowId: string;` - Contributes to the local implementation details in this scope.
- L10: `triggerData: Record<string, unknown>;` - Contributes to the local implementation details in this scope.
- L11: `bucketMinutes?: number;` - Contributes to the local implementation details in this scope.
- L12: `}): string {` - Contributes to the local implementation details in this scope.
- L13: `const bucketMinutes = params.bucketMinutes ?? 1;` - Declares a constant used to hold configuration, state, or helper logic in this scope.
- L14: `const now = new Date();` - Declares a constant used to hold configuration, state, or helper logic in this scope.
- L15: `now.setSeconds(0, 0);` - Contributes to the local implementation details in this scope.
- L16: `now.setMinutes(Math.floor(now.getMinutes() / bucketMinutes) * bucketMinutes);` - Contributes to the local implementation details in this scope.
- L18: `return sha256(\`${params.workflowId}:${JSON.stringify(params.triggerData)}:${now.toISOString()}\`);` - Returns data/UI to the caller, ending the current function path.
- L19: `}` - Contributes to the local implementation details in this scope.
- L21: `export function generateWebhookIdempotencyKey(params: {` - Defines a function entrypoint that encapsulates one unit of behavior.
- L22: `endpointId: string;` - Contributes to the local implementation details in this scope.
- L23: `body: string;` - Contributes to the local implementation details in this scope.
- L24: `headerKey?: string;` - Contributes to the local implementation details in this scope.
- L25: `}): string {` - Contributes to the local implementation details in this scope.
- L26: `return sha256(\`${params.endpointId}:${params.body}:${params.headerKey ?? ""}\`);` - Returns data/UI to the caller, ending the current function path.
- L27: `}` - Contributes to the local implementation details in this scope.
- L29: `export async function lookupIdempotencyRunId(key: string, tenantId: string): Promise<string | null> {` - Defines a function entrypoint that encapsulates one unit of behavior.
- L30: `const row = await db.query.idempotencyKeys.findFirst({` - Declares a constant used to hold configuration, state, or helper logic in this scope.
- L31: `where: and(eq(idempotencyKeys.key, key), eq(idempotencyKeys.tenantId, tenantId), gt(idempotencyKeys.expiresAt, new Date())),` - Contributes to the local implementation details in this scope.
- L32: `});` - Contributes to the local implementation details in this scope.
- L34: `return row?.runId ?? null;` - Returns data/UI to the caller, ending the current function path.
- L35: `}` - Contributes to the local implementation details in this scope.
- L37: `export async function reserveIdempotencyKey(params: {` - Defines a function entrypoint that encapsulates one unit of behavior.
- L38: `key: string;` - Contributes to the local implementation details in this scope.
- L39: `tenantId: string;` - Contributes to the local implementation details in this scope.
- L40: `runId: string;` - Contributes to the local implementation details in this scope.
- L41: `ttlHours?: number;` - Contributes to the local implementation details in this scope.
- L42: `}): Promise<boolean> {` - Contributes to the local implementation details in this scope.
- L43: `const ttlHours = params.ttlHours ?? DEFAULT_TTL_HOURS;` - Declares a constant used to hold configuration, state, or helper logic in this scope.
- L44: `const expiresAt = new Date(Date.now() + ttlHours * 60 * 60 * 1000);` - Declares a constant used to hold configuration, state, or helper logic in this scope.
- L46: `const rows = await db` - Declares a constant used to hold configuration, state, or helper logic in this scope.
- L47: `.insert(idempotencyKeys)` - Interacts with the database; this is a persistent side effect.
- L48: `.values({` - Contributes to the local implementation details in this scope.
- L49: `key: params.key,` - Contributes to the local implementation details in this scope.
- L50: `tenantId: params.tenantId,` - Contributes to the local implementation details in this scope.
- L51: `runId: params.runId,` - Contributes to the local implementation details in this scope.
- L52: `expiresAt,` - Contributes to the local implementation details in this scope.
- L53: `})` - Contributes to the local implementation details in this scope.
- L54: `.onConflictDoNothing({ target: [idempotencyKeys.key, idempotencyKeys.tenantId] })` - Contributes to the local implementation details in this scope.
- L55: `.returning({ id: idempotencyKeys.id });` - Contributes to the local implementation details in this scope.
- L57: `return rows.length > 0;` - Returns data/UI to the caller, ending the current function path.
- L58: `}` - Contributes to the local implementation details in this scope.
- L60: `export async function cleanupExpiredIdempotencyKeys(): Promise<number> {` - Defines a function entrypoint that encapsulates one unit of behavior.
- L61: `const result = await db` - Declares a constant used to hold configuration, state, or helper logic in this scope.
- L62: `.delete(idempotencyKeys)` - Interacts with the database; this is a persistent side effect.
- L63: `.where(sql\`${idempotencyKeys.expiresAt} < now()\`)` - Contributes to the local implementation details in this scope.
- L64: `.returning({ id: idempotencyKeys.id });` - Contributes to the local implementation details in this scope.
- L66: `return result.length;` - Returns data/UI to the caller, ending the current function path.
- L67: `}` - Contributes to the local implementation details in this scope.

### State management
- L15: `now.setSeconds(0, 0);` affects state ownership or updates.
- L16: `now.setMinutes(Math.floor(now.getMinutes() / bucketMinutes) * bucketMinutes);` affects state ownership or updates.

### Scope and closures
- L6: Module/function-scoped constant provides stable reference.
- L13: Module/function-scoped constant provides stable reference.
- L14: Module/function-scoped constant provides stable reference.
- L30: Module/function-scoped constant provides stable reference.
- L43: Module/function-scoped constant provides stable reference.
- L44: Module/function-scoped constant provides stable reference.
- L46: Module/function-scoped constant provides stable reference.
- L61: Module/function-scoped constant provides stable reference.

### Control flow
Control flow is mostly linear: input comes in, transformations run, and a value is returned.

### Side effects
- L30: Database IO side effect.

### TypeScript types and contracts
- L10: Generic type parameter constrains data shape.
- L29: Promise return type signals async contract.
- L42: Promise return type signals async contract.
- L60: Promise return type signals async contract.

## Concepts taught by this file
- database modeling with ORM
- idempotency
- async/await control flow

## Common mistakes
- Mixing step-level and run-level failures, which breaks retry behavior.
- Mutating shared context in unsafe ways across async boundaries.
- Skipping log writes, making run debugging much harder.

## Mini exercises
- Add a new step runner behavior (for example, custom timeout handling) and thread it through executor logic.
- Add one extra structured log field and verify it appears in run traces.
- Modify retry behavior to cap maximum delay and explain tradeoffs.

## Further reading
- database modeling with ORM: search for "Drizzle ORM schema and relations"
- idempotency: search for "API idempotency keys explained"
- async/await control flow: search for "JavaScript async await error handling"
