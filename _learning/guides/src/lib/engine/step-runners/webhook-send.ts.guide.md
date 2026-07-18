# Guide: src/lib/engine/step-runners/webhook-send.ts

## Purpose
This file is part of the workflow execution engine. It transforms workflow definitions into runtime behavior with retries, branching, and run logging.

## Line-by-line walkthrough

### Imports (what and why)
- L1: `import { db } from "@/lib/db";` imports from `@/lib/db` so this module can use that dependency.
- L2: `import { webhookDeliveries } from "@/lib/db/schema";` imports from `@/lib/db/schema` so this module can use that dependency.
- L3: `import { signPayload } from "@/lib/webhooks/signature";` imports from `@/lib/webhooks/signature` so this module can use that dependency.
- L4: `import { StepExecutionError } from "@/lib/utils/errors";` imports from `@/lib/utils/errors` so this module can use that dependency.
- L5: `import type { StepInput, StepOutput, StepRunner } from "@/lib/engine/step-runners/types";` imports from `@/lib/engine/step-runners/types` so this module can use that dependency.

### Functions and components
- L7: **WebhookSendRunner** (exported class) - signature: `export class WebhookSendRunner implements StepRunner {`.

### Ordered walkthrough
- L1: `import { db } from "@/lib/db";` - Imports a dependency so this module can use external functionality.
- L2: `import { webhookDeliveries } from "@/lib/db/schema";` - Imports a dependency so this module can use external functionality.
- L3: `import { signPayload } from "@/lib/webhooks/signature";` - Imports a dependency so this module can use external functionality.
- L4: `import { StepExecutionError } from "@/lib/utils/errors";` - Imports a dependency so this module can use external functionality.
- L5: `import type { StepInput, StepOutput, StepRunner } from "@/lib/engine/step-runners/types";` - Imports a dependency so this module can use external functionality.
- L7: `export class WebhookSendRunner implements StepRunner {` - Defines a class that groups behavior and state under one abstraction.
- L8: `async execute(input: StepInput, config: Record<string, unknown>): Promise<StepOutput> {` - Contributes to the local implementation details in this scope.
- L9: `const url = typeof config.url === "string" ? config.url : "";` - Declares a constant used to hold configuration, state, or helper logic in this scope.
- L10: `const method = typeof config.method === "string" ? config.method : "POST";` - Declares a constant used to hold configuration, state, or helper logic in this scope.
- L11: `const signingSecret = typeof config.signingSecret === "string" ? config.signingSecret : "";` - Declares a constant used to hold configuration, state, or helper logic in this scope.
- L12: `const headers = typeof config.headers === "object" && config.headers ? (config.headers as Record<string, string>) : {};` - Declares a constant used to hold configuration, state, or helper logic in this scope.
- L14: `if (!url || !signingSecret) {` - Branches control flow so different code paths run under different conditions.
- L15: `throw new StepExecutionError("webhook_send requires url and signingSecret", "WEBHOOK_SEND_CONFIG_ERROR");` - Raises an error intentionally so callers can react to failure.
- L16: `}` - Contributes to the local implementation details in this scope.
- L18: `const payload = JSON.stringify(input.data);` - Declares a constant used to hold configuration, state, or helper logic in this scope.
- L19: `const signature = signPayload(payload, signingSecret);` - Declares a constant used to hold configuration, state, or helper logic in this scope.
- L21: `try {` - Starts guarded execution for operations that may throw.
- L22: `const response = await fetch(url, {` - Declares a constant used to hold configuration, state, or helper logic in this scope.
- L23: `method,` - Contributes to the local implementation details in this scope.
- L24: `headers: {` - Contributes to the local implementation details in this scope.
- L25: `"content-type": "application/json",` - Contributes to the local implementation details in this scope.
- L26: `"x-flowpilot-signature": signature,` - Contributes to the local implementation details in this scope.
- L27: `"x-flowpilot-timestamp": new Date().toISOString(),` - Contributes to the local implementation details in this scope.
- L28: `...headers,` - Contributes to the local implementation details in this scope.
- L29: `},` - Contributes to the local implementation details in this scope.
- L30: `body: payload,` - Contributes to the local implementation details in this scope.
- L31: `});` - Contributes to the local implementation details in this scope.
- L33: `const responseBody = await response.text();` - Declares a constant used to hold configuration, state, or helper logic in this scope.
- L35: `await db.insert(webhookDeliveries).values({` - Interacts with the database; this is a persistent side effect.
- L36: `runId: input.metadata.runId,` - Contributes to the local implementation details in this scope.
- L37: `url,` - Contributes to the local implementation details in this scope.
- L38: `method,` - Contributes to the local implementation details in this scope.
- L39: `headers,` - Contributes to the local implementation details in this scope.
- L40: `requestBody: input.data,` - Contributes to the local implementation details in this scope.
- L41: `responseStatus: response.status,` - Contributes to the local implementation details in this scope.
- L42: `responseBody,` - Contributes to the local implementation details in this scope.
- L43: `signature,` - Contributes to the local implementation details in this scope.
- L44: `attempt: input.metadata.attempt,` - Contributes to the local implementation details in this scope.
- L45: `status: response.ok ? "success" : "failed",` - Contributes to the local implementation details in this scope.
- L46: `});` - Contributes to the local implementation details in this scope.
- L48: `if (!response.ok) {` - Branches control flow so different code paths run under different conditions.
- L49: `throw new StepExecutionError(\`Outbound webhook failed (${response.status})\`, \`HTTP_${response.status}\`);` - Raises an error intentionally so callers can react to failure.
- L50: `}` - Contributes to the local implementation details in this scope.
- L52: `return {` - Returns data/UI to the caller, ending the current function path.
- L53: `data: {` - Contributes to the local implementation details in this scope.
- L54: `status: response.status,` - Contributes to the local implementation details in this scope.
- L55: `responseBody,` - Contributes to the local implementation details in this scope.
- L56: `},` - Contributes to the local implementation details in this scope.
- L57: `};` - Contributes to the local implementation details in this scope.
- L58: `} catch (error: unknown) {` - Contributes to the local implementation details in this scope.
- L59: `if (error instanceof StepExecutionError) {` - Branches control flow so different code paths run under different conditions.
- L60: `throw error;` - Contributes to the local implementation details in this scope.
- L61: `}` - Contributes to the local implementation details in this scope.
- L62: `throw new StepExecutionError(` - Raises an error intentionally so callers can react to failure.
- L63: `error instanceof Error ? error.message : "Outbound webhook failed",` - Contributes to the local implementation details in this scope.
- L64: `"WEBHOOK_DELIVERY_ERROR",` - Contributes to the local implementation details in this scope.
- L65: `);` - Contributes to the local implementation details in this scope.
- L66: `}` - Contributes to the local implementation details in this scope.
- L67: `}` - Contributes to the local implementation details in this scope.
- L68: `}` - Contributes to the local implementation details in this scope.

### State management
This file is mostly stateless. Most values are local constants or function parameters.

### Scope and closures
- L9: Module/function-scoped constant provides stable reference.
- L10: Module/function-scoped constant provides stable reference.
- L11: Module/function-scoped constant provides stable reference.
- L12: Module/function-scoped constant provides stable reference.
- L18: Module/function-scoped constant provides stable reference.
- L19: Module/function-scoped constant provides stable reference.
- L22: Module/function-scoped constant provides stable reference.
- L33: Module/function-scoped constant provides stable reference.

### Control flow
- L14: Conditional branch chooses behavior based on runtime input.
- L21: Protected block for expected fallible operations.
- L48: Conditional branch chooses behavior based on runtime input.
- L59: Conditional branch chooses behavior based on runtime input.

### Side effects
- L22: Network request side effect.
- L35: Database IO side effect.

### TypeScript types and contracts
- L8: Promise return type signals async contract.
- L8: Generic type parameter constrains data shape.
- L12: Generic type parameter constrains data shape.

## Concepts taught by this file
- error handling strategy
- webhook signature security
- TypeScript type contracts
- async/await control flow
- configuration as code

## Common mistakes
- Mixing step-level and run-level failures, which breaks retry behavior.
- Mutating shared context in unsafe ways across async boundaries.
- Skipping log writes, making run debugging much harder.

## Mini exercises
- Add a new step runner behavior (for example, custom timeout handling) and thread it through executor logic.
- Add one extra structured log field and verify it appears in run traces.
- Modify retry behavior to cap maximum delay and explain tradeoffs.

## Further reading
- error handling strategy: search for "error handling best practices TypeScript backend"
- webhook signature security: search for "HMAC webhook signature verification"
- TypeScript type contracts: search for "TypeScript interfaces vs types"
- async/await control flow: search for "JavaScript async await error handling"
- configuration as code: search for "Twelve-Factor App config"
