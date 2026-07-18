# Guide: src/app/api/webhooks/incoming/[endpointId]/route.ts

## Purpose
This file defines a server API route. It handles HTTP requests, validates and transforms input, coordinates database/service calls, and returns a standardized response envelope.

## Line-by-line walkthrough

### Imports (what and why)
- L1: `import { and, eq } from "drizzle-orm";` imports from `drizzle-orm` so this module can use that dependency.
- L2: `import { NextRequest } from "next/server";` imports from `next/server` so this module can use that dependency.
- L3: `import { db } from "@/lib/db";` imports from `@/lib/db` so this module can use that dependency.
- L4: `import { eventLog, webhookEndpoints, workflowRuns, workflows } from "@/lib/db/schema";` imports from `@/lib/db/schema` so this module can use that dependency.
- L5: `import { generateWebhookIdempotencyKey, lookupIdempotencyRunId } from "@/lib/engine/idempotency";` imports from `@/lib/engine/idempotency` so this module can use that dependency.
- L6: `import { workflowQueue } from "@/lib/queue/workflows.queue";` imports from `@/lib/queue/workflows.queue` so this module can use that dependency.
- L7: `import { fromError, ok } from "@/lib/utils/api";` imports from `@/lib/utils/api` so this module can use that dependency.
- L8: `import { WebhookVerificationError } from "@/lib/utils/errors";` imports from `@/lib/utils/errors` so this module can use that dependency.
- L9: `import { verifySignature } from "@/lib/webhooks/signature";` imports from `@/lib/webhooks/signature` so this module can use that dependency.

### Functions and components
- L11: **POST** (exported async function) - signature: `export async function POST(request: NextRequest, { params }: { params: { endpointId: string } }) {`.

### Ordered walkthrough
- L1: `import { and, eq } from "drizzle-orm";` - Imports a dependency so this module can use external functionality.
- L2: `import { NextRequest } from "next/server";` - Imports a dependency so this module can use external functionality.
- L3: `import { db } from "@/lib/db";` - Imports a dependency so this module can use external functionality.
- L4: `import { eventLog, webhookEndpoints, workflowRuns, workflows } from "@/lib/db/schema";` - Imports a dependency so this module can use external functionality.
- L5: `import { generateWebhookIdempotencyKey, lookupIdempotencyRunId } from "@/lib/engine/idempotency";` - Imports a dependency so this module can use external functionality.
- L6: `import { workflowQueue } from "@/lib/queue/workflows.queue";` - Imports a dependency so this module can use external functionality.
- L7: `import { fromError, ok } from "@/lib/utils/api";` - Imports a dependency so this module can use external functionality.
- L8: `import { WebhookVerificationError } from "@/lib/utils/errors";` - Imports a dependency so this module can use external functionality.
- L9: `import { verifySignature } from "@/lib/webhooks/signature";` - Imports a dependency so this module can use external functionality.
- L11: `export async function POST(request: NextRequest, { params }: { params: { endpointId: string } }) {` - Defines a function entrypoint that encapsulates one unit of behavior.
- L12: `try {` - Starts guarded execution for operations that may throw.
- L13: `const endpoint = await db.query.webhookEndpoints.findFirst({` - Declares a constant used to hold configuration, state, or helper logic in this scope.
- L14: `where: and(eq(webhookEndpoints.id, params.endpointId), eq(webhookEndpoints.isActive, true)),` - Contributes to the local implementation details in this scope.
- L15: `});` - Contributes to the local implementation details in this scope.
- L17: `if (!endpoint) {` - Branches control flow so different code paths run under different conditions.
- L18: `return ok(null);` - Builds an HTTP response object returned to the client.
- L19: `}` - Contributes to the local implementation details in this scope.
- L21: `const rawBody = await request.text();` - Declares a constant used to hold configuration, state, or helper logic in this scope.
- L22: `const signature = request.headers.get("x-flowpilot-signature") ?? "";` - Declares a constant used to hold configuration, state, or helper logic in this scope.
- L23: `const externalIdempotency = request.headers.get("x-idempotency-key") ?? undefined;` - Declares a constant used to hold configuration, state, or helper logic in this scope.
- L25: `const valid = verifySignature(rawBody, signature, endpoint.signingSecret);` - Declares a constant used to hold configuration, state, or helper logic in this scope.
- L26: `if (!valid) {` - Branches control flow so different code paths run under different conditions.
- L27: `throw new WebhookVerificationError();` - Raises an error intentionally so callers can react to failure.
- L28: `}` - Contributes to the local implementation details in this scope.
- L30: `const idempotencyKey = generateWebhookIdempotencyKey({` - Declares a constant used to hold configuration, state, or helper logic in this scope.
- L31: `endpointId: endpoint.id,` - Contributes to the local implementation details in this scope.
- L32: `body: rawBody,` - Contributes to the local implementation details in this scope.
- L33: `headerKey: externalIdempotency,` - Contributes to the local implementation details in this scope.
- L34: `});` - Contributes to the local implementation details in this scope.
- L36: `const existingRunId = await lookupIdempotencyRunId(idempotencyKey, endpoint.tenantId);` - Declares a constant used to hold configuration, state, or helper logic in this scope.
- L37: `if (existingRunId) {` - Branches control flow so different code paths run under different conditions.
- L38: `return ok({ runId: existingRunId }, 202);` - Builds an HTTP response object returned to the client.
- L39: `}` - Contributes to the local implementation details in this scope.
- L41: `const workflow = await db.query.workflows.findFirst({ where: eq(workflows.id, endpoint.workflowId) });` - Declares a constant used to hold configuration, state, or helper logic in this scope.
- L42: `if (!workflow) {` - Branches control flow so different code paths run under different conditions.
- L43: `return ok(null);` - Builds an HTTP response object returned to the client.
- L44: `}` - Contributes to the local implementation details in this scope.
- L46: `const triggerData = rawBody ? (JSON.parse(rawBody) as Record<string, unknown>) : {};` - Declares a constant used to hold configuration, state, or helper logic in this scope.
- L48: `const [run] = await db` - Declares a constant used to hold configuration, state, or helper logic in this scope.
- L49: `.insert(workflowRuns)` - Interacts with the database; this is a persistent side effect.
- L50: `.values({` - Contributes to the local implementation details in this scope.
- L51: `workflowId: workflow.id,` - Contributes to the local implementation details in this scope.
- L52: `tenantId: endpoint.tenantId,` - Contributes to the local implementation details in this scope.
- L53: `triggeredBy: "webhook",` - Contributes to the local implementation details in this scope.
- L54: `triggerData,` - Contributes to the local implementation details in this scope.
- L55: `idempotencyKey,` - Contributes to the local implementation details in this scope.
- L56: `status: "pending",` - Contributes to the local implementation details in this scope.
- L57: `})` - Contributes to the local implementation details in this scope.
- L58: `.returning();` - Contributes to the local implementation details in this scope.
- L60: `await workflowQueue.add(\`webhook-${run.id}\`, {` - Contributes to the local implementation details in this scope.
- L61: `runId: run.id,` - Contributes to the local implementation details in this scope.
- L62: `workflowId: workflow.id,` - Contributes to the local implementation details in this scope.
- L63: `tenantId: endpoint.tenantId,` - Contributes to the local implementation details in this scope.
- L64: `triggerData,` - Contributes to the local implementation details in this scope.
- L65: `idempotencyKey,` - Contributes to the local implementation details in this scope.
- L66: `workflowVersion: workflow.version,` - Contributes to the local implementation details in this scope.
- L67: `});` - Contributes to the local implementation details in this scope.
- L69: `await db.insert(eventLog).values({` - Interacts with the database; this is a persistent side effect.
- L70: `tenantId: endpoint.tenantId,` - Contributes to the local implementation details in this scope.
- L71: `eventType: "webhook.received",` - Contributes to the local implementation details in this scope.
- L72: `entityType: "webhook",` - Contributes to the local implementation details in this scope.
- L73: `entityId: endpoint.id,` - Contributes to the local implementation details in this scope.
- L74: `payload: {` - Contributes to the local implementation details in this scope.
- L75: `workflowId: workflow.id,` - Contributes to the local implementation details in this scope.
- L76: `runId: run.id,` - Contributes to the local implementation details in this scope.
- L77: `},` - Contributes to the local implementation details in this scope.
- L78: `});` - Contributes to the local implementation details in this scope.
- L80: `await db.update(webhookEndpoints).set({ lastTriggered: new Date() }).where(eq(webhookEndpoints.id, endpoint.id));` - Interacts with the database; this is a persistent side effect.
- L82: `return ok({ runId: run.id }, 202);` - Builds an HTTP response object returned to the client.
- L83: `} catch (error: unknown) {` - Contributes to the local implementation details in this scope.
- L84: `return fromError(error);` - Returns data/UI to the caller, ending the current function path.
- L85: `}` - Contributes to the local implementation details in this scope.
- L86: `}` - Contributes to the local implementation details in this scope.

### State management
- L80: `await db.update(webhookEndpoints).set({ lastTriggered: new Date() }).where(eq(webhookEndpoints.id, endpoint.id));` affects state ownership or updates.

### Scope and closures
- L13: Module/function-scoped constant provides stable reference.
- L21: Module/function-scoped constant provides stable reference.
- L22: Module/function-scoped constant provides stable reference.
- L23: Module/function-scoped constant provides stable reference.
- L25: Module/function-scoped constant provides stable reference.
- L30: Module/function-scoped constant provides stable reference.
- L36: Module/function-scoped constant provides stable reference.
- L41: Module/function-scoped constant provides stable reference.

### Control flow
- L12: Protected block for expected fallible operations.
- L17: Conditional branch chooses behavior based on runtime input.
- L26: Conditional branch chooses behavior based on runtime input.
- L37: Conditional branch chooses behavior based on runtime input.
- L42: Conditional branch chooses behavior based on runtime input.

### Side effects
- L13: Database IO side effect.
- L41: Database IO side effect.
- L69: Database IO side effect.
- L80: Database IO side effect.

### TypeScript types and contracts
- L46: Generic type parameter constrains data shape.

## Concepts taught by this file
- api route handler
- database modeling with ORM
- background job processing
- error handling strategy
- idempotency
- webhook signature security
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
- idempotency: search for "API idempotency keys explained"
- webhook signature security: search for "HMAC webhook signature verification"
- async/await control flow: search for "JavaScript async await error handling"
