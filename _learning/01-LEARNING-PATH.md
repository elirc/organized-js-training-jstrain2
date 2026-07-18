# FlowPilot Learning Path

This path is ordered from foundational concepts to advanced runtime behavior. Read each chapter in order. Do not skip checkpoints.

How to use this:
- Read the listed guides in sequence.
- Open the real code side-by-side while reading each guide.
- After each chapter checkpoint, implement one tiny change to confirm understanding.

## Chapter 0: Orientation and Tooling

- [docker-compose.yml.guide.md](guides/docker-compose.yml.guide.md)
- [drizzle.config.ts.guide.md](guides/drizzle.config.ts.guide.md)
- [eslint.config.mjs.guide.md](guides/eslint.config.mjs.guide.md)
- [next.config.mjs.guide.md](guides/next.config.mjs.guide.md)
- [package.json.guide.md](guides/package.json.guide.md)
- [playwright.config.ts.guide.md](guides/playwright.config.ts.guide.md)
- [tailwind.config.js.guide.md](guides/tailwind.config.js.guide.md)
- [tsconfig.json.guide.md](guides/tsconfig.json.guide.md)
- [vitest.config.ts.guide.md](guides/vitest.config.ts.guide.md)

**Checkpoint**
You should understand how this project is built, run, linted, type-checked, and tested at a tooling level.

## Chapter 1: Core Domain Types and Contracts

- [src/lib/validators/step.schema.ts.guide.md](guides/src/lib/validators/step.schema.ts.guide.md)
- [src/lib/validators/webhook.schema.ts.guide.md](guides/src/lib/validators/webhook.schema.ts.guide.md)
- [src/lib/validators/workflow.schema.ts.guide.md](guides/src/lib/validators/workflow.schema.ts.guide.md)
- [src/types/next-auth.d.ts.guide.md](guides/src/types/next-auth.d.ts.guide.md)
- [src/types/prop-types/index.d.ts.guide.md](guides/src/types/prop-types/index.d.ts.guide.md)
- [src/types/run.ts.guide.md](guides/src/types/run.ts.guide.md)
- [src/types/step.ts.guide.md](guides/src/types/step.ts.guide.md)
- [src/types/workflow.ts.guide.md](guides/src/types/workflow.ts.guide.md)

**Checkpoint**
You should understand the shape of workflows, steps, runs, and why schema validation protects API boundaries.

## Chapter 2: Database Layer

- [src/lib/db/index.ts.guide.md](guides/src/lib/db/index.ts.guide.md)
- [src/lib/db/schema.ts.guide.md](guides/src/lib/db/schema.ts.guide.md)
- [src/lib/db/seed.ts.guide.md](guides/src/lib/db/seed.ts.guide.md)

**Checkpoint**
You should understand table design, indexes, foreign keys, and how app data is persisted and seeded.

## Chapter 3: Shared Utilities and Error Model

- [src/lib/utils/api.ts.guide.md](guides/src/lib/utils/api.ts.guide.md)
- [src/lib/utils/crypto.ts.guide.md](guides/src/lib/utils/crypto.ts.guide.md)
- [src/lib/utils/errors.ts.guide.md](guides/src/lib/utils/errors.ts.guide.md)
- [src/lib/utils/logger.ts.guide.md](guides/src/lib/utils/logger.ts.guide.md)
- [src/lib/utils/retry.ts.guide.md](guides/src/lib/utils/retry.ts.guide.md)
- [src/lib/webhooks/registry.ts.guide.md](guides/src/lib/webhooks/registry.ts.guide.md)
- [src/lib/webhooks/signature.ts.guide.md](guides/src/lib/webhooks/signature.ts.guide.md)

**Checkpoint**
You should understand response envelopes, custom errors, hashing/signatures, retry math, and logging helpers.

## Chapter 4: Auth and Tenant Authorization

- [src/app/api/auth/[...nextauth]/route.ts.guide.md](guides/src/app/api/auth/[...nextauth]/route.ts.guide.md)
- [src/auth.ts.guide.md](guides/src/auth.ts.guide.md)
- [src/lib/auth/config.ts.guide.md](guides/src/lib/auth/config.ts.guide.md)
- [src/lib/auth/tenant.ts.guide.md](guides/src/lib/auth/tenant.ts.guide.md)

**Checkpoint**
You should understand authentication setup, session enrichment, and tenant-scoped access control.

## Chapter 5: Workflow APIs (CRUD + Runs)

- [src/app/api/workflows/[id]/execute/route.ts.guide.md](guides/src/app/api/workflows/[id]/execute/route.ts.guide.md)
- [src/app/api/workflows/[id]/route.ts.guide.md](guides/src/app/api/workflows/[id]/route.ts.guide.md)
- [src/app/api/workflows/[id]/runs/[runId]/replay/route.ts.guide.md](guides/src/app/api/workflows/[id]/runs/[runId]/replay/route.ts.guide.md)
- [src/app/api/workflows/[id]/runs/[runId]/route.ts.guide.md](guides/src/app/api/workflows/[id]/runs/[runId]/route.ts.guide.md)
- [src/app/api/workflows/[id]/runs/route.ts.guide.md](guides/src/app/api/workflows/[id]/runs/route.ts.guide.md)
- [src/app/api/workflows/route.ts.guide.md](guides/src/app/api/workflows/route.ts.guide.md)

**Checkpoint**
You should understand how workflow creation, updates, execution triggers, run listing, and replay endpoints work.

## Chapter 6: Webhooks, SSE, and Admin APIs

- [src/app/api/admin/dead-letter/[id]/discard/route.ts.guide.md](guides/src/app/api/admin/dead-letter/[id]/discard/route.ts.guide.md)
- [src/app/api/admin/dead-letter/[id]/retry/route.ts.guide.md](guides/src/app/api/admin/dead-letter/[id]/retry/route.ts.guide.md)
- [src/app/api/admin/dead-letter/route.ts.guide.md](guides/src/app/api/admin/dead-letter/route.ts.guide.md)
- [src/app/api/admin/metrics/route.ts.guide.md](guides/src/app/api/admin/metrics/route.ts.guide.md)
- [src/app/api/events/stream/route.ts.guide.md](guides/src/app/api/events/stream/route.ts.guide.md)
- [src/app/api/webhooks/incoming/[endpointId]/route.ts.guide.md](guides/src/app/api/webhooks/incoming/[endpointId]/route.ts.guide.md)
- [src/app/api/webhooks/route.ts.guide.md](guides/src/app/api/webhooks/route.ts.guide.md)

**Checkpoint**
You should understand webhook verification, realtime streaming, metrics, and dead-letter administration endpoints.

## Chapter 7: Execution Engine and Step Runners

- [src/lib/engine/context.ts.guide.md](guides/src/lib/engine/context.ts.guide.md)
- [src/lib/engine/executor.ts.guide.md](guides/src/lib/engine/executor.ts.guide.md)
- [src/lib/engine/idempotency.ts.guide.md](guides/src/lib/engine/idempotency.ts.guide.md)
- [src/lib/engine/step-runners/condition.ts.guide.md](guides/src/lib/engine/step-runners/condition.ts.guide.md)
- [src/lib/engine/step-runners/delay.ts.guide.md](guides/src/lib/engine/step-runners/delay.ts.guide.md)
- [src/lib/engine/step-runners/http-request.ts.guide.md](guides/src/lib/engine/step-runners/http-request.ts.guide.md)
- [src/lib/engine/step-runners/index.ts.guide.md](guides/src/lib/engine/step-runners/index.ts.guide.md)
- [src/lib/engine/step-runners/loop.ts.guide.md](guides/src/lib/engine/step-runners/loop.ts.guide.md)
- [src/lib/engine/step-runners/transform.ts.guide.md](guides/src/lib/engine/step-runners/transform.ts.guide.md)
- [src/lib/engine/step-runners/types.ts.guide.md](guides/src/lib/engine/step-runners/types.ts.guide.md)
- [src/lib/engine/step-runners/webhook-send.ts.guide.md](guides/src/lib/engine/step-runners/webhook-send.ts.guide.md)

**Checkpoint**
You should understand orchestration flow, retry behavior, context propagation, and runner dispatch design.

## Chapter 8: Queue and Worker Runtime

- [src/lib/queue/connection.ts.guide.md](guides/src/lib/queue/connection.ts.guide.md)
- [src/lib/queue/dead-letter.ts.guide.md](guides/src/lib/queue/dead-letter.ts.guide.md)
- [src/lib/queue/webhooks.queue.ts.guide.md](guides/src/lib/queue/webhooks.queue.ts.guide.md)
- [src/lib/queue/workflows.queue.ts.guide.md](guides/src/lib/queue/workflows.queue.ts.guide.md)
- [worker/health.ts.guide.md](guides/worker/health.ts.guide.md)
- [worker/index.ts.guide.md](guides/worker/index.ts.guide.md)
- [worker/processors/workflow.processor.ts.guide.md](guides/worker/processors/workflow.processor.ts.guide.md)

**Checkpoint**
You should understand async processing boundaries and the responsibilities of queue modules versus worker modules.

## Chapter 9: Frontend App Shell and Pages

- [src/app/(auth)/login/page.tsx.guide.md](guides/src/app/(auth)/login/page.tsx.guide.md)
- [src/app/(auth)/register/page.tsx.guide.md](guides/src/app/(auth)/register/page.tsx.guide.md)
- [src/app/dashboard/page.tsx.guide.md](guides/src/app/dashboard/page.tsx.guide.md)
- [src/app/dashboard/workflows/[id]/page.tsx.guide.md](guides/src/app/dashboard/workflows/[id]/page.tsx.guide.md)
- [src/app/dashboard/workflows/[id]/runs/[runId]/page.tsx.guide.md](guides/src/app/dashboard/workflows/[id]/runs/[runId]/page.tsx.guide.md)
- [src/app/dashboard/workflows/[id]/runs/page.tsx.guide.md](guides/src/app/dashboard/workflows/[id]/runs/page.tsx.guide.md)
- [src/app/dashboard/workflows/new/page.tsx.guide.md](guides/src/app/dashboard/workflows/new/page.tsx.guide.md)
- [src/app/dashboard/workflows/page.tsx.guide.md](guides/src/app/dashboard/workflows/page.tsx.guide.md)
- [src/app/globals.css.guide.md](guides/src/app/globals.css.guide.md)
- [src/app/layout.tsx.guide.md](guides/src/app/layout.tsx.guide.md)
- [src/app/page.tsx.guide.md](guides/src/app/page.tsx.guide.md)
- [src/app/settings/page.tsx.guide.md](guides/src/app/settings/page.tsx.guide.md)

**Checkpoint**
You should understand route-level composition, page entrypoints, and where user actions begin in the UI.

## Chapter 10: Components, Hooks, and Store

- [src/components/dashboard/WorkflowCard.tsx.guide.md](guides/src/components/dashboard/WorkflowCard.tsx.guide.md)
- [src/components/runs/RunStatusBadge.tsx.guide.md](guides/src/components/runs/RunStatusBadge.tsx.guide.md)
- [src/components/runs/RunTimeline.tsx.guide.md](guides/src/components/runs/RunTimeline.tsx.guide.md)
- [src/components/shared/AppProviders.tsx.guide.md](guides/src/components/shared/AppProviders.tsx.guide.md)
- [src/components/shared/CodeEditor.tsx.guide.md](guides/src/components/shared/CodeEditor.tsx.guide.md)
- [src/components/shared/ConfirmDialog.tsx.guide.md](guides/src/components/shared/ConfirmDialog.tsx.guide.md)
- [src/components/shared/JsonViewer.tsx.guide.md](guides/src/components/shared/JsonViewer.tsx.guide.md)
- [src/components/ui/button.tsx.guide.md](guides/src/components/ui/button.tsx.guide.md)
- [src/components/ui/card.tsx.guide.md](guides/src/components/ui/card.tsx.guide.md)
- [src/components/ui/input.tsx.guide.md](guides/src/components/ui/input.tsx.guide.md)
- [src/components/workflow-builder/Canvas.tsx.guide.md](guides/src/components/workflow-builder/Canvas.tsx.guide.md)
- [src/components/workflow-builder/StepConfigPanel.tsx.guide.md](guides/src/components/workflow-builder/StepConfigPanel.tsx.guide.md)
- [src/components/workflow-builder/StepNode.tsx.guide.md](guides/src/components/workflow-builder/StepNode.tsx.guide.md)
- [src/components/workflow-builder/ToolboxSidebar.tsx.guide.md](guides/src/components/workflow-builder/ToolboxSidebar.tsx.guide.md)
- [src/hooks/useDebounce.ts.guide.md](guides/src/hooks/useDebounce.ts.guide.md)
- [src/hooks/useRunStream.ts.guide.md](guides/src/hooks/useRunStream.ts.guide.md)
- [src/hooks/useWorkflowBuilder.ts.guide.md](guides/src/hooks/useWorkflowBuilder.ts.guide.md)
- [src/stores/workflow-builder.store.ts.guide.md](guides/src/stores/workflow-builder.store.ts.guide.md)

**Checkpoint**
You should understand local UI composition, custom hooks, and shared client state with Zustand.

## Chapter 11: Operational Automation Script

- [scripts/codex-watchdog.mjs.guide.md](guides/scripts/codex-watchdog.mjs.guide.md)

**Checkpoint**
You should understand file/process side effects, watchdog logic, and practical automation scripting patterns.

## Chapter 12: Testing Surface

- [tests/e2e/webhook-trigger.spec.ts.guide.md](guides/tests/e2e/webhook-trigger.spec.ts.guide.md)
- [tests/e2e/workflow-crud.spec.ts.guide.md](guides/tests/e2e/workflow-crud.spec.ts.guide.md)
- [tests/e2e/workflow-execution.spec.ts.guide.md](guides/tests/e2e/workflow-execution.spec.ts.guide.md)
- [tests/unit/engine/executor.test.ts.guide.md](guides/tests/unit/engine/executor.test.ts.guide.md)
- [tests/unit/engine/idempotency.test.ts.guide.md](guides/tests/unit/engine/idempotency.test.ts.guide.md)
- [tests/unit/queue/retry.test.ts.guide.md](guides/tests/unit/queue/retry.test.ts.guide.md)
- [tests/unit/webhooks/signature.test.ts.guide.md](guides/tests/unit/webhooks/signature.test.ts.guide.md)

**Checkpoint**
You should understand current test scaffolding and what coverage still needs to be built out.


## Final Milestone
After all chapters, you should be able to:
- Add a new workflow step type end-to-end (validator + API + executor + runner + UI config).
- Trace any production issue from UI symptom to API route to DB record and worker logs.
- Explain current technical debt (in-memory queue shim, placeholder tests) and propose a concrete upgrade plan.
