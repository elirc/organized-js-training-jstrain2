# FlowPilot Patterns & Anti-Patterns

## Design patterns used in this project

## 1) Layered Architecture
What it is: Separate UI, API, domain logic, and infrastructure so each layer has a clear responsibility.

Project examples:
- UI/pages: `src/app/**`, `src/components/**`
- API boundary: `src/app/api/**`
- Domain/infrastructure: `src/lib/**`
- Worker runtime: `worker/**`

Why it helps juniors:
- Easier debugging because you can ask: “Is this a UI issue, API issue, or engine issue?”

Extra mini-example:
- In a blog app: `components/` (UI), `api/posts` (routes), `lib/posts` (business logic), `db` (persistence).

## 2) Thin Controller, Fat Service
What it is: Route handlers do auth/validation/orchestration; heavy logic lives in shared services.

Project examples:
- Route: `src/app/api/workflows/[id]/execute/route.ts`
- Service logic: `src/lib/engine/executor.ts`

Why it helps:
- You can reuse service logic from worker and API without copy/paste.

Extra mini-example:
- Payment route validates card token, then calls `PaymentService.charge()`.

## 3) Strategy Pattern for Step Runners
What it is: Runtime behavior selected from a map of implementations.

Project example (`src/lib/engine/step-runners/index.ts`):
```ts
const runners: Record<string, StepRunner> = {
  http_request: new HttpRequestRunner(),
  transform: new TransformRunner(),
  // ...
};
```

Why it helps:
- Adding new step types is isolated and predictable.

Extra mini-example:
- Shipping calculator chooses USPS/FedEx/DHL strategy by carrier code.

## 4) Explicit Error Taxonomy
What it is: Custom error classes with stable error codes.

Project example (`src/lib/utils/errors.ts`):
- `FlowPilotError`
- `StepExecutionError`
- `ConcurrencyLimitError`

Why it helps:
- APIs and logs can react consistently to known failures.

Extra mini-example:
- `InventoryOutOfStockError` can map to HTTP 409 and clear UI message.

## 5) Validation at Boundaries
What it is: Validate incoming payloads before deeper logic.

Project examples:
- `src/lib/validators/workflow.schema.ts`
- `src/lib/validators/step.schema.ts`

Why it helps:
- Fail fast with useful errors, not random null/undefined crashes later.

Extra mini-example:
- Validate file upload size/type before writing to cloud storage.

## 6) Consistent API Envelope
What it is: Standard success/error response shape.

Project example (`src/lib/utils/api.ts`):
```ts
{ success: true, data }
{ success: false, error: { code, message } }
```

Why it helps:
- Frontend parsing is simpler and less fragile.

Extra mini-example:
- Mobile clients can build one generic error interceptor.

## 7) Event-driven Realtime Updates
What it is: Worker publishes events, UI subscribes via SSE.

Project examples:
- publish: `src/lib/engine/executor.ts`
- stream endpoint: `src/app/api/events/stream/route.ts`
- client hook: `src/hooks/useRunStream.ts`

Why it helps:
- Users see live status without manual refresh.

Extra mini-example:
- CI pipeline dashboard streams stage transitions in real time.

## 8) Schema-as-Code for Database
What it is: DB schema defined in TypeScript source.

Project example:
- `src/lib/db/schema.ts`

Why it helps:
- Easier code review of data model changes.

Extra mini-example:
- New `invoices` table reviewed in PR before migration runs.

## 9) Store-driven UI for Complex Editors
What it is: Zustand store centralizes workflow builder state.

Project examples:
- store: `src/stores/workflow-builder.store.ts`
- consumers: `src/components/workflow-builder/*.tsx`

Why it helps:
- Multiple components can share selected step/current graph state cleanly.

Extra mini-example:
- Kanban board keeps card selection and filters in one store.

## 10) Operational Guard Script
What it is: watchdog script monitors tool health and self-recovers.

Project example:
- `scripts/codex-watchdog.mjs`

Why it helps:
- Reduces manual babysitting in long-running coding sessions.

Extra mini-example:
- script restarts local worker if heartbeat file is stale.

---

## Anti-patterns (present or at risk) and how to improve

## A) In-memory Queue/Redis Shim in Runtime Path
Current state:
- `src/lib/queue/connection.ts` and `src/lib/queue/workflows.queue.ts` use in-memory implementations.

Why this is risky:
- Not durable across restarts.
- Not safe for multi-instance deployment.

Better:
- Move to real Redis + BullMQ in all runtime code paths.
- Keep in-memory version only for isolated tests.

## B) Placeholder Tests
Current state:
- `tests/unit/**` and `tests/e2e/**` mostly assert placeholders.

Why this is risky:
- False confidence; core engine behavior is mostly unprotected.

Better:
- Add real tests for executor retries, idempotency collisions, webhook signature failure, and replay correctness.

## C) Large Monolithic Schema File
Current state:
- `src/lib/db/schema.ts` is long and dense.

Why this is risky:
- Harder onboarding and review focus.

Better:
- Split by domain (`schema/workflows.ts`, `schema/runs.ts`, `schema/webhooks.ts`) and re-export.

## D) Security Footgun Risk in Transform Runner
Current state:
- Transform uses `vm2` in `src/lib/engine/step-runners/transform.ts`.

Why this is risky:
- Sandbox escapes have existed historically in JS sandbox libs.

Better:
- Use stronger isolation (separate process/isolated-vm/container boundary), strict resource limits, and policy controls.

## E) UI Scaffolds with Minimal Behavior
Current state:
- Some components/pages are placeholders (for example dashboard metrics placeholders).

Why this is risky:
- Learners may assume features are complete when they are scaffold-only.

Better:
- Label scaffold components explicitly and add TODO links to source-of-truth issues.

## F) Hardcoded/Fallback Runtime Defaults in Code
Current state:
- DB fallback connection string in `src/lib/db/index.ts`.

Why this is risky:
- Environment mistakes can be masked.

Better:
- Fail fast in production if required env vars are missing.

## G) Node Modules Hotfixes
Current state:
- Earlier local build fixes included patch-like handling in dependencies.

Why this is risky:
- Not reproducible across clean environments.

Better:
- Resolve through proper dependency lock refresh and deterministic install pipeline.

---

## Practical refactor order (high impact first)
1. Replace in-memory queue/pubsub with BullMQ + Redis in runtime modules.
2. Add meaningful unit tests for executor/idempotency/signature modules.
3. Add integration tests for workflow execute + run logs + replay.
4. Harden transform execution isolation.
5. Break up schema and document module boundaries.
