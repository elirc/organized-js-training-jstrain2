# Guide: src/lib/engine/step-runners/delay.ts

## Purpose
This file is part of the workflow execution engine. It transforms workflow definitions into runtime behavior with retries, branching, and run logging.

## Line-by-line walkthrough

### Imports (what and why)
- L1: `import { sleep } from "@/lib/utils/retry";` imports from `@/lib/utils/retry` so this module can use that dependency.
- L2: `import type { StepInput, StepOutput, StepRunner } from "@/lib/engine/step-runners/types";` imports from `@/lib/engine/step-runners/types` so this module can use that dependency.

### Functions and components
- L4: **DelayRunner** (exported class) - signature: `export class DelayRunner implements StepRunner {`.

### Ordered walkthrough
- L1: `import { sleep } from "@/lib/utils/retry";` - Imports a dependency so this module can use external functionality.
- L2: `import type { StepInput, StepOutput, StepRunner } from "@/lib/engine/step-runners/types";` - Imports a dependency so this module can use external functionality.
- L4: `export class DelayRunner implements StepRunner {` - Defines a class that groups behavior and state under one abstraction.
- L5: `async execute(_input: StepInput, config: Record<string, unknown>): Promise<StepOutput> {` - Contributes to the local implementation details in this scope.
- L6: `const delayMs = typeof config.delayMs === "number" ? config.delayMs : 1000;` - Declares a constant used to hold configuration, state, or helper logic in this scope.
- L7: `await sleep(delayMs);` - Contributes to the local implementation details in this scope.
- L8: `return {` - Returns data/UI to the caller, ending the current function path.
- L9: `data: { delayedMs: delayMs },` - Contributes to the local implementation details in this scope.
- L10: `};` - Contributes to the local implementation details in this scope.
- L11: `}` - Contributes to the local implementation details in this scope.
- L12: `}` - Contributes to the local implementation details in this scope.

### State management
This file is mostly stateless. Most values are local constants or function parameters.

### Scope and closures
- L6: Module/function-scoped constant provides stable reference.

### Control flow
Control flow is mostly linear: input comes in, transformations run, and a value is returned.

### Side effects
No major external side effects; this file mostly shapes data or UI.

### TypeScript types and contracts
- L5: Promise return type signals async contract.
- L5: Generic type parameter constrains data shape.

## Concepts taught by this file
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
- TypeScript type contracts: search for "TypeScript interfaces vs types"
- async/await control flow: search for "JavaScript async await error handling"
- configuration as code: search for "Twelve-Factor App config"
