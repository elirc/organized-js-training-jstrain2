# Guide: src/lib/engine/step-runners/http-request.ts

## Purpose
This file is part of the workflow execution engine. It transforms workflow definitions into runtime behavior with retries, branching, and run logging.

## Line-by-line walkthrough

### Imports (what and why)
- L1: `import { StepExecutionError } from "@/lib/utils/errors";` imports from `@/lib/utils/errors` so this module can use that dependency.
- L2: `import type { StepInput, StepOutput, StepRunner } from "@/lib/engine/step-runners/types";` imports from `@/lib/engine/step-runners/types` so this module can use that dependency.

### Functions and components
- L4: **HttpRequestRunner** (exported class) - signature: `export class HttpRequestRunner implements StepRunner {`.

### Ordered walkthrough
- L1: `import { StepExecutionError } from "@/lib/utils/errors";` - Imports a dependency so this module can use external functionality.
- L2: `import type { StepInput, StepOutput, StepRunner } from "@/lib/engine/step-runners/types";` - Imports a dependency so this module can use external functionality.
- L4: `export class HttpRequestRunner implements StepRunner {` - Defines a class that groups behavior and state under one abstraction.
- L5: `async execute(input: StepInput, config: Record<string, unknown>): Promise<StepOutput> {` - Contributes to the local implementation details in this scope.
- L6: `const url = typeof config.url === "string" ? config.url : "";` - Declares a constant used to hold configuration, state, or helper logic in this scope.
- L7: `const method = typeof config.method === "string" ? config.method : "POST";` - Declares a constant used to hold configuration, state, or helper logic in this scope.
- L8: `const headers = typeof config.headers === "object" && config.headers ? (config.headers as Record<string, string>) : {};` - Declares a constant used to hold configuration, state, or helper logic in this scope.
- L9: `const expectedStatus = typeof config.expectedStatus === "number" ? config.expectedStatus : undefined;` - Declares a constant used to hold configuration, state, or helper logic in this scope.
- L10: `const timeoutMs = typeof config.timeoutMs === "number" ? config.timeoutMs : 10000;` - Declares a constant used to hold configuration, state, or helper logic in this scope.
- L12: `if (!url) {` - Branches control flow so different code paths run under different conditions.
- L13: `throw new StepExecutionError("HTTP request URL is required", "HTTP_CONFIG_ERROR");` - Raises an error intentionally so callers can react to failure.
- L14: `}` - Contributes to the local implementation details in this scope.
- L16: `const controller = new AbortController();` - Declares a constant used to hold configuration, state, or helper logic in this scope.
- L17: `const timeout = setTimeout(() => controller.abort(), timeoutMs);` - Declares a constant used to hold configuration, state, or helper logic in this scope.
- L19: `try {` - Starts guarded execution for operations that may throw.
- L20: `const body = config.body === undefined ? undefined : JSON.stringify(config.body);` - Declares a constant used to hold configuration, state, or helper logic in this scope.
- L21: `const response = await fetch(url, {` - Declares a constant used to hold configuration, state, or helper logic in this scope.
- L22: `method,` - Contributes to the local implementation details in this scope.
- L23: `headers: {` - Contributes to the local implementation details in this scope.
- L24: `"content-type": "application/json",` - Contributes to the local implementation details in this scope.
- L25: `...headers,` - Contributes to the local implementation details in this scope.
- L26: `},` - Contributes to the local implementation details in this scope.
- L27: `body,` - Contributes to the local implementation details in this scope.
- L28: `signal: controller.signal,` - Contributes to the local implementation details in this scope.
- L29: `});` - Contributes to the local implementation details in this scope.
- L31: `const text = await response.text();` - Declares a constant used to hold configuration, state, or helper logic in this scope.
- L33: `if (expectedStatus !== undefined && response.status !== expectedStatus) {` - Branches control flow so different code paths run under different conditions.
- L34: `throw new StepExecutionError(` - Raises an error intentionally so callers can react to failure.
- L35: `\`Unexpected status code ${response.status}, expected ${expectedStatus}\`,` - Contributes to the local implementation details in this scope.
- L36: `\`HTTP_${response.status}\`,` - Contributes to the local implementation details in this scope.
- L37: `);` - Contributes to the local implementation details in this scope.
- L38: `}` - Contributes to the local implementation details in this scope.
- L40: `if (!response.ok) {` - Branches control flow so different code paths run under different conditions.
- L41: `throw new StepExecutionError(\`Request failed with ${response.status}\`, \`HTTP_${response.status}\`);` - Raises an error intentionally so callers can react to failure.
- L42: `}` - Contributes to the local implementation details in this scope.
- L44: `return {` - Returns data/UI to the caller, ending the current function path.
- L45: `data: {` - Contributes to the local implementation details in this scope.
- L46: `status: response.status,` - Contributes to the local implementation details in this scope.
- L47: `responseText: text,` - Contributes to the local implementation details in this scope.
- L48: `},` - Contributes to the local implementation details in this scope.
- L49: `};` - Contributes to the local implementation details in this scope.
- L50: `} catch (error: unknown) {` - Contributes to the local implementation details in this scope.
- L51: `if (error instanceof DOMException && error.name === "AbortError") {` - Branches control flow so different code paths run under different conditions.
- L52: `throw new StepExecutionError("HTTP request timeout", "STEP_TIMEOUT");` - Raises an error intentionally so callers can react to failure.
- L53: `}` - Contributes to the local implementation details in this scope.
- L54: `if (error instanceof StepExecutionError) {` - Branches control flow so different code paths run under different conditions.
- L55: `throw error;` - Contributes to the local implementation details in this scope.
- L56: `}` - Contributes to the local implementation details in this scope.
- L57: `throw new StepExecutionError(error instanceof Error ? error.message : "HTTP request failed", "HTTP_REQUEST_ERROR");` - Raises an error intentionally so callers can react to failure.
- L58: `} finally {` - Contributes to the local implementation details in this scope.
- L59: `clearTimeout(timeout);` - Contributes to the local implementation details in this scope.
- L60: `}` - Contributes to the local implementation details in this scope.
- L61: `}` - Contributes to the local implementation details in this scope.
- L62: `}` - Contributes to the local implementation details in this scope.

### State management
- L17: `const timeout = setTimeout(() => controller.abort(), timeoutMs);` affects state ownership or updates.

### Scope and closures
- L6: Module/function-scoped constant provides stable reference.
- L7: Module/function-scoped constant provides stable reference.
- L8: Module/function-scoped constant provides stable reference.
- L9: Module/function-scoped constant provides stable reference.
- L10: Module/function-scoped constant provides stable reference.
- L16: Module/function-scoped constant provides stable reference.
- L20: Module/function-scoped constant provides stable reference.
- L21: Module/function-scoped constant provides stable reference.

### Control flow
- L12: Conditional branch chooses behavior based on runtime input.
- L19: Protected block for expected fallible operations.
- L33: Conditional branch chooses behavior based on runtime input.
- L40: Conditional branch chooses behavior based on runtime input.
- L51: Conditional branch chooses behavior based on runtime input.
- L54: Conditional branch chooses behavior based on runtime input.

### Side effects
- L21: Network request side effect.

### TypeScript types and contracts
- L5: Promise return type signals async contract.
- L5: Generic type parameter constrains data shape.
- L8: Generic type parameter constrains data shape.

## Concepts taught by this file
- error handling strategy
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
- TypeScript type contracts: search for "TypeScript interfaces vs types"
- async/await control flow: search for "JavaScript async await error handling"
- configuration as code: search for "Twelve-Factor App config"
