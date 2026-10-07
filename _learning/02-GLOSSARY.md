# FlowPilot Concepts Glossary

This glossary covers the core concepts used across the `_learning/guides/*` files.
For each concept:
- Plain-English definition
- Example from this project
- One extra mini-example to reinforce understanding

## API Route Handler
A function that receives an HTTP request and returns an HTTP response.

Project example (`src/app/api/workflows/route.ts`):
```ts
export async function GET(request: NextRequest) {
  const { tenantId } = await requireTenantContext();
  const items = await db.query.workflows.findMany({ /* ... */ });
  return ok({ items });
}
```
Extra mini-example: a `GET /api/health` route that always returns `{ ok: true }`.

## Response Envelope
A consistent response shape (`success`, `data`, `error`) used by all APIs.

Project example (`src/lib/utils/api.ts`):
```ts
export function ok<T>(data: T, status = 200) {
  return NextResponse.json({ success: true, data }, { status });
}
```
Extra mini-example: return `{ success:false, error:{ code:'NOT_FOUND', message:'User missing' } }` instead of raw strings.

## Cursor Pagination
Pagination using a cursor token (often an ID) instead of page numbers/offset.

Project example (`src/app/api/workflows/route.ts`):
```ts
const hasMore = items.length > query.limit;
const sliced = hasMore ? items.slice(0, query.limit) : items;
```
Extra mini-example: fetch 21 rows for limit 20; keep 20 and use row 20's ID as next cursor.

## Multi-tenancy
One app instance serves many tenant accounts while isolating their data.

Project example (`src/lib/db/schema.ts`):
```ts
tenantId: uuid("tenant_id").notNull().references(() => tenants.id)
```
Extra mini-example: tenant A and tenant B can both create "Daily Sync" workflows without collisions.

## Tenant Authorization Guard
Server-side check that the current user belongs to a tenant before data access.

Project example (`src/lib/auth/tenant.ts`):
```ts
const member = await db.query.tenantMembers.findFirst({ where: eq(tenantMembers.userId, userId) });
if (!member) throw new FlowPilotError("Tenant membership not found", "TENANT_NOT_FOUND");
```
Extra mini-example: block `GET /api/workflows` if user has valid session but no tenant membership.

## Drizzle ORM
Type-safe SQL builder/ORM for querying and defining schema in TypeScript.

Project example (`src/lib/db/index.ts`):
```ts
export const db = drizzle(pool, { schema });
```
Extra mini-example: use `.update(table).set({ active: false })` with compiler-checked column names.

## pgTable Schema Definition
Drizzle function to define PostgreSQL tables in code.

Project example (`src/lib/db/schema.ts`):
```ts
export const workflows = pgTable("workflows", { id: uuid("id").defaultRandom().primaryKey() })
```
Extra mini-example: define `tasks` table with `title`, `status`, `created_at`.

## Database Index
A database structure that speeds up frequent lookup/sort patterns.

Project example (`src/lib/db/schema.ts`):
```ts
tenantStatusIdx: index("idx_runs_tenant_status").on(table.tenantId, table.status)
```
Extra mini-example: add an index on `email` if login frequently queries by email.

## Foreign Key
A column that points to another table's primary key.

Project example (`src/lib/db/schema.ts`):
```ts
workflowId: uuid("workflow_id").references(() => workflows.id, { onDelete: "cascade" })
```
Extra mini-example: deleting a parent row can cascade delete child rows if configured.

## Seed Script
Script that inserts starter data for local development/testing.

Project example (`src/lib/db/seed.ts`):
```ts
await db.insert(tenants).values({ name: "Acme Corp", slug: "acme" })
```
Extra mini-example: seed one admin user so UI login works immediately.

## Zod Validation
Runtime schema validation to reject malformed input.

Project example (`src/lib/validators/workflow.schema.ts`):
```ts
export const workflowCreateSchema = z.object({ name: z.string().min(1).max(255) })
```
Extra mini-example: `z.string().email()` to validate email input.

## Type Alias
A named TypeScript type used for readability and reuse.

Project example (`src/types/step.ts`):
```ts
export type StepType = "http_request" | "transform" | "condition" | "delay" | "webhook_send" | "loop";
```
Extra mini-example: `type Currency = "USD" | "EUR"` for strict value control.

## Interface
A structural contract describing required fields/methods.

Project example (`src/lib/engine/step-runners/types.ts`):
```ts
export interface StepRunner {
  execute(input: StepInput, config: Record<string, unknown>, context: RunContext): Promise<StepOutput>;
}
```
Extra mini-example: `interface Logger { info(msg:string): void }`.

## Generics
Type parameters (`<T>`) that make code reusable across data shapes.

Project example (`src/lib/utils/api.ts`):
```ts
export function ok<T>(data: T, status = 200)
```
Extra mini-example: `function first<T>(arr: T[]): T | undefined`.

## Custom Error Hierarchy
Error classes that encode machine-readable error codes and domain meaning.

Project example (`src/lib/utils/errors.ts`):
```ts
export class ConcurrencyLimitError extends FlowPilotError { /* ... */ }
```
Extra mini-example: `PaymentDeclinedError` extending base `AppError`.

## Idempotency Key
A key that prevents processing the same request/work twice.

Project example (`src/lib/engine/idempotency.ts`):
```ts
return sha256(`${params.workflowId}:${JSON.stringify(params.triggerData)}:${now.toISOString()}`);
```
Extra mini-example: payment API uses request ID header to avoid double charge on retries.

## Exponential Backoff
Retry delay grows with each failed attempt.

Project example (`src/lib/utils/retry.ts`):
```ts
return Math.round(options.backoffMs * options.backoffMultiplier ** Math.max(0, attempt - 1));
```
Extra mini-example: delays 1s -> 2s -> 4s when API keeps failing.

## Dead Letter Queue (DLQ)
Storage for work items that failed all retries and need manual attention.

Project example (`src/lib/queue/dead-letter.ts`):
```ts
await db.insert(deadLetterItems).values({ runId: input.runId, error: input.error })
```
Extra mini-example: failed email sends moved to DLQ for later replay.

## Workflow Executor
The orchestrator that runs each step in order and records results.

Project example (`src/lib/engine/executor.ts`):
```ts
const output = await this.executeStep(job, currentStep, context);
```
Extra mini-example: executor for ETL jobs runs extract -> transform -> load in sequence.

## Strategy Pattern (Step Runner Map)
Select behavior at runtime from a map of implementations.

Project example (`src/lib/engine/step-runners/index.ts`):
```ts
const runners: Record<string, StepRunner> = { http_request: new HttpRequestRunner(), transform: new TransformRunner() }
```
Extra mini-example: payment provider map chooses Stripe vs PayPal handler by key.

## Run Context
Shared object that carries trigger data and step outputs between steps.

Project example (`src/lib/engine/context.ts`):
```ts
this.state = { triggerData, steps: {} };
```
Extra mini-example: store `userId` from step 1 and reuse in step 3 API call.

## HMAC Signature
A cryptographic signature generated from payload + secret to verify authenticity.

Project example (`src/lib/webhooks/signature.ts`):
```ts
return crypto.createHmac("sha256", secret).update(payload).digest("hex");
```
Extra mini-example: sign outgoing webhook body so receiver can trust sender.

## Timing-safe Comparison
Compare secrets without leaking differences via timing behavior.

Project example (`src/lib/webhooks/signature.ts`):
```ts
return crypto.timingSafeEqual(expectedBuffer, receivedBuffer);
```
Extra mini-example: compare API tokens using timing-safe compare, not `===`.

## Server-Sent Events (SSE)
One-way server -> browser stream for live updates.

Project example (`src/app/api/events/stream/route.ts`):
```ts
return new Response(stream, { headers: { "Content-Type": "text/event-stream" } });
```
Extra mini-example: stream progress updates during long report generation.

## EventSource
Browser API that subscribes to SSE endpoints.

Project example (`src/hooks/useRunStream.ts`):
```ts
const source = new EventSource(`/api/events/stream?runId=${encodeURIComponent(runId)}`);
```
Extra mini-example: dashboard opens EventSource for live CI job state.
## Queue
A buffer of jobs processed asynchronously.

Project example (`src/lib/queue/workflows.queue.ts`):
```ts
await workflowQueue.add(`run-${run.id}`, { runId: run.id, workflowId: workflow.id, tenantId });
```
Extra mini-example: image upload request enqueues thumbnail generation instead of doing it inline.

## Worker Process
Separate process that consumes queue jobs away from HTTP request lifecycle.

Project example (`worker/index.ts`):
```ts
await workflowQueue.setProcessor(async (job) => { await executor.run(data); })
```
Extra mini-example: nightly billing worker runs while web API remains responsive.

## Pub/Sub
Publish/subscribe messaging model for decoupled event updates.

Project example (`src/lib/queue/connection.ts`):
```ts
await redis.publish(`flowpilot:runs:${job.runId}`, JSON.stringify({ event: "step.completed" }))
```
Extra mini-example: publish `order.shipped` and let multiple subscribers react independently.

## React Component
A function that returns UI markup (JSX).

Project example (`src/components/workflow-builder/Canvas.tsx`):
```tsx
export function WorkflowBuilderShell({ workflowId }: { workflowId: string | null }) { return <div>...</div>; }
```
Extra mini-example: `UserBadge` component renders avatar + username from props.

## Custom Hook
Reusable function that packages stateful React logic.

Project example (`src/hooks/useDebounce.ts`):
```ts
export function useDebounce<T>(value: T, delay = 250): T { /* ... */ }
```
Extra mini-example: `useOnlineStatus()` hook wraps `window.navigator.onLine` + listeners.

## Zustand Store
Small state container for client-side shared UI state.

Project example (`src/stores/workflow-builder.store.ts`):
```ts
export const useWorkflowBuilderStore = create<WorkflowBuilderState>((set) => ({ steps: [], addStep: ... }));
```
Extra mini-example: global toast store with `addToast` and `removeToast` actions.

## Debouncing
Delay updates until input has stopped changing for a short time.

Project example (`src/hooks/useDebounce.ts`):
```ts
const handle = setTimeout(() => setDebounced(value), delay);
```
Extra mini-example: search box waits 300ms before firing API request.
## Async/Await
Syntax for writing asynchronous code in a sequential style.

Project example (`src/app/api/webhooks/route.ts`):
```ts
const payload = webhookEndpointCreateSchema.parse(await request.json());
```
Extra mini-example: `const data = await fetch(url).then(r => r.json())`.

## Try/Catch Error Path
Controlled handling of thrown exceptions.

Project example (`src/app/api/workflows/route.ts`):
```ts
try { /* route logic */ } catch (error: unknown) { return fromError(error); }
```
Extra mini-example: wrap JSON parsing in try/catch so a bad body does not crash the handler. Note that in this codebase `fromError` (`src/lib/utils/api.ts:25-33`) returns 400 only for `FlowPilotError`. A `SyntaxError` from `request.json()` or a `ZodError` from `.parse()` comes back as `500 INTERNAL_ERROR`. To get a 400 you must map those errors yourself.

## Side Effect
An operation that changes external state (network, DB, file, timer).

Project example (`scripts/codex-watchdog.mjs`):
```js
await fsp.writeFile(promptPath, content, "utf8");
```
Extra mini-example: writing audit logs to disk is a side effect.

## Structured Logging
Logs with machine-parseable fields (not only plain text).

Project example (`src/lib/utils/logger.ts`):
```ts
export const logger = pino({ level, redact: { paths: ["payload"] } });
```
Extra mini-example: include `{ orderId, userId }` in every checkout log line.

## Environment Variable
Runtime configuration loaded from environment, not hardcoded.

Project example (`src/lib/db/index.ts`):
```ts
const connectionString = process.env.DATABASE_URL;
```
Extra mini-example: `NODE_ENV=production` toggles stricter security settings.

## Docker Compose Service Topology
YAML file defining local multi-service runtime (app, DB, Redis).

Project example (`docker-compose.yml`):
```yml
services:
  postgres:
    image: postgres:16-alpine
```
Extra mini-example: add a local `mailhog` service for email testing.

## Watchdog Automation Script
A script that monitors tool health and triggers recovery actions.

Project example (`scripts/codex-watchdog.mjs`):
```js
const stuck = ageMs >= STUCK_AFTER_MS && state.staleChecks >= MIN_STALE_CHECKS;
if (stuck) await triggerRestart(promptText);
```
Extra mini-example: CI watchdog restarts flaky worker if heartbeat file stops updating.


