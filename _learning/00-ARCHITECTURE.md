# FlowPilot Architecture Guide

## 1) What this app does
FlowPilot is a workflow automation app (Zapier-style). Users define workflows like “when webhook X arrives, run steps A -> B -> C,” then monitor execution with run history and step logs. The app is built for teams that need repeatable backend automations, queueing, retries, and auditable run status.

### Who it is for
- Product/ops teams that automate repetitive backend actions.
- Developers who need traceable run history for integrations.
- Multi-tenant SaaS use cases where each tenant has separate workflow data and limits.

### Core business capabilities in this codebase
- Workflow CRUD APIs (`src/app/api/workflows/**`).
- Execution engine with step runners (`src/lib/engine/**`).
- Run/step persistence and replay (`src/app/api/workflows/[id]/runs/**`).
- Webhooks inbound/outbound with signature support (`src/app/api/webhooks/**`, `src/lib/webhooks/**`).
- Realtime run updates via SSE (`src/app/api/events/stream/route.ts`, `src/hooks/useRunStream.ts`).
- Queue/worker orchestration (`src/lib/queue/**`, `worker/**`).

## 2) Big-picture data flow
```mermaid
flowchart LR
  U[User in Browser] --> UI[Next.js App Router Pages]
  UI --> API[Route Handlers /api/*]

  API --> AUTH[Auth + Tenant Guard]
  AUTH --> DB[(PostgreSQL via Drizzle)]

  API --> Q[Workflow Queue]
  Q --> W[Worker Process]
  W --> EX[WorkflowExecutor]
  EX --> SR[Step Runners]
  SR --> DB

  EX --> PUB[Pub/Sub Channel]
  PUB --> SSE[/api/events/stream]
  SSE --> UI

  API --> WHI[Inbound Webhooks]
  SR --> WHO[Outbound Webhooks]

  EX --> DLQ[Dead Letter Records]
  DLQ --> ADMIN[/api/admin/dead-letter]
```

## 3) Request/response lifecycle (example: user manually executes a workflow)
1. User clicks “Run” in UI (workflow page).
2. Frontend calls `POST /api/workflows/[id]/execute`.
3. Route validates tenant + workflow, creates a `workflow_runs` record with `pending`.
4. Route enqueues a job in `workflowQueue`.
5. Worker receives the job and calls `WorkflowExecutor.run(...)`.
6. Executor checks concurrency and idempotency, loads ordered steps, marks run `running`.
7. For each step:
   - resolves input mapping from `RunContext`
   - runs step runner
   - logs step in `step_logs`
   - publishes SSE event for live UI
   - retries if needed using backoff
8. Executor finishes run:
   - updates `workflow_runs` (`completed`/`failed`)
   - stores `context_data`
   - writes `event_log` and dead-letter if exhausted
9. User sees updated run status in run detail page (`/dashboard/workflows/[id]/runs/[runId]`).

## 4) Key design decisions (and why)

### Next.js App Router for frontend + API
- Why: one codebase for UI and route handlers, strong TypeScript integration.
- Tradeoff: app and API are tightly coupled; scaling API independently is harder.

### Drizzle ORM + explicit schema file
- Why: schema-as-code makes tables/indexes/constraints readable in Git.
- Where: `src/lib/db/schema.ts`.
- Tradeoff: schema file is long and needs discipline to keep consistent.

### Execution engine separated from routes
- Why: API should be thin; orchestration logic belongs in reusable services.
- Where: `src/lib/engine/executor.ts`, `src/lib/engine/step-runners/*`.
- Tradeoff: more abstraction to learn for juniors.

### Queue + worker model
- Why: long-running steps should not block HTTP requests.
- Where: `src/lib/queue/*`, `worker/*`.
- Important honesty: current implementation uses **in-memory queue/redis shim** for local build reliability. Intended production target from prompt is BullMQ + Redis.

### Standard API response envelope
- Pattern: `{ success: boolean, data?, error? }`.
- Why: frontend can parse all endpoint responses consistently.
- Where: `src/lib/utils/api.ts`.

### Zod validation for boundary inputs
- Why: reject bad input early at API edge.
- Where: `src/lib/validators/*.schema.ts`.

## 5) Dependency map (layered)

### Layer A: UI and pages
- `src/app/**` depends on components/hooks/stores.
- `src/components/**` depends on hooks/stores/types.
- `src/hooks/**` depends on browser APIs and stores.

### Layer B: API boundary
- `src/app/api/**` depends on:
  - auth guard (`src/lib/auth/tenant.ts`)
  - validation (`src/lib/validators/*`)
  - db client/schema (`src/lib/db/*`)
  - queue/engine utilities (`src/lib/queue/*`, `src/lib/engine/*`)
  - response helpers (`src/lib/utils/api.ts`)

### Layer C: domain and infrastructure
- `src/lib/engine/**` depends on db + utils + queue connection + step runners.
- `src/lib/queue/**` depends on db/utilities.
- `src/lib/webhooks/**` depends on db/utilities.
- `worker/**` depends on queue + executor.

### Layer D: persistence and contracts
- `src/lib/db/schema.ts` and `src/types/*` are foundational contracts used across layers.

## 6) Environment and infrastructure

### Development (in this repo today)
- App: Next.js (`npm run dev`).
- Worker: `npm run worker`.
- DB: PostgreSQL expected via `DATABASE_URL` (default fallback in `src/lib/db/index.ts`).
- Queue/pubsub: currently in-memory shim (`src/lib/queue/connection.ts`, `src/lib/queue/workflows.queue.ts`).

### Intended production architecture (from design prompt)
- App container + worker container.
- PostgreSQL + Redis as managed services.
- BullMQ queues with retry/dead-letter semantics.
- SSE stream for live run updates.

### Notable technical debt / workaround flags
- `src/lib/queue/connection.ts`: in-memory Redis substitute (not suitable for multi-instance production).
- `src/lib/queue/workflows.queue.ts`: in-memory queue abstraction (no durable persistence).
- Tests are mostly placeholders (`tests/**`).
- Several UI files are scaffold-level placeholders.

## 7) Folder structure rationale
- `src/app`: route-level pages and API routes (entrypoints).
- `src/lib`: backend business/infrastructure logic (reusable services).
- `src/components`: reusable UI building blocks.
- `src/hooks`, `src/stores`: client state and behavior abstractions.
- `worker`: out-of-request background processing.
- `tests`: unit + e2e testing surface.
- `_learning`: onboarding curriculum generated for intern/junior training.
