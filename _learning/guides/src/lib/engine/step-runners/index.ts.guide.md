# Guide: src/lib/engine/step-runners/index.ts

## Purpose
This file is part of the workflow execution engine. It transforms workflow definitions into runtime behavior with retries, branching, and run logging.

## Line-by-line walkthrough

### Imports (what and why)
- L1: `import { ConditionRunner } from "@/lib/engine/step-runners/condition";` imports from `@/lib/engine/step-runners/condition` so this module can use that dependency.
- L2: `import { DelayRunner } from "@/lib/engine/step-runners/delay";` imports from `@/lib/engine/step-runners/delay` so this module can use that dependency.
- L3: `import { HttpRequestRunner } from "@/lib/engine/step-runners/http-request";` imports from `@/lib/engine/step-runners/http-request` so this module can use that dependency.
- L4: `import { LoopRunner } from "@/lib/engine/step-runners/loop";` imports from `@/lib/engine/step-runners/loop` so this module can use that dependency.
- L5: `import { TransformRunner } from "@/lib/engine/step-runners/transform";` imports from `@/lib/engine/step-runners/transform` so this module can use that dependency.
- L6: `import type { StepRunner } from "@/lib/engine/step-runners/types";` imports from `@/lib/engine/step-runners/types` so this module can use that dependency.
- L7: `import { WebhookSendRunner } from "@/lib/engine/step-runners/webhook-send";` imports from `@/lib/engine/step-runners/webhook-send` so this module can use that dependency.

### Functions and components
- L18: **getStepRunner** (exported function) - signature: `export function getStepRunner(stepType: string): StepRunner {`.

### Ordered walkthrough
- L1: `import { ConditionRunner } from "@/lib/engine/step-runners/condition";` - Imports a dependency so this module can use external functionality.
- L2: `import { DelayRunner } from "@/lib/engine/step-runners/delay";` - Imports a dependency so this module can use external functionality.
- L3: `import { HttpRequestRunner } from "@/lib/engine/step-runners/http-request";` - Imports a dependency so this module can use external functionality.
- L4: `import { LoopRunner } from "@/lib/engine/step-runners/loop";` - Imports a dependency so this module can use external functionality.
- L5: `import { TransformRunner } from "@/lib/engine/step-runners/transform";` - Imports a dependency so this module can use external functionality.
- L6: `import type { StepRunner } from "@/lib/engine/step-runners/types";` - Imports a dependency so this module can use external functionality.
- L7: `import { WebhookSendRunner } from "@/lib/engine/step-runners/webhook-send";` - Imports a dependency so this module can use external functionality.
- L9: `const runners: Record<string, StepRunner> = {` - Declares a constant used to hold configuration, state, or helper logic in this scope.
- L10: `http_request: new HttpRequestRunner(),` - Contributes to the local implementation details in this scope.
- L11: `transform: new TransformRunner(),` - Contributes to the local implementation details in this scope.
- L12: `condition: new ConditionRunner(),` - Contributes to the local implementation details in this scope.
- L13: `delay: new DelayRunner(),` - Contributes to the local implementation details in this scope.
- L14: `webhook_send: new WebhookSendRunner(),` - Contributes to the local implementation details in this scope.
- L15: `loop: new LoopRunner(),` - Contributes to the local implementation details in this scope.
- L16: `};` - Contributes to the local implementation details in this scope.
- L18: `export function getStepRunner(stepType: string): StepRunner {` - Defines a function entrypoint that encapsulates one unit of behavior.
- L19: `const runner = runners[stepType];` - Declares a constant used to hold configuration, state, or helper logic in this scope.
- L20: `if (!runner) {` - Branches control flow so different code paths run under different conditions.
- L21: `throw new Error(\`Unsupported step type: ${stepType}\`);` - Raises an error intentionally so callers can react to failure.
- L22: `}` - Contributes to the local implementation details in this scope.
- L23: `return runner;` - Returns data/UI to the caller, ending the current function path.
- L24: `}` - Contributes to the local implementation details in this scope.

### State management
This file is mostly stateless. Most values are local constants or function parameters.

### Scope and closures
- L9: Module/function-scoped constant provides stable reference.
- L19: Module/function-scoped constant provides stable reference.

### Control flow
- L20: Conditional branch chooses behavior based on runtime input.

### Side effects
No major external side effects; this file mostly shapes data or UI.

### TypeScript types and contracts
- L9: Generic type parameter constrains data shape.

## Concepts taught by this file
- error handling strategy
- TypeScript type contracts

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
