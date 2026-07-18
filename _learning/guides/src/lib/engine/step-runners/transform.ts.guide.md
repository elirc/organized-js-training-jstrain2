# Guide: src/lib/engine/step-runners/transform.ts

## Purpose
This file is part of the workflow execution engine. It transforms workflow definitions into runtime behavior with retries, branching, and run logging.

## Line-by-line walkthrough

### Imports (what and why)
- L1: `import { VM } from "vm2";` imports from `vm2` so this module can use that dependency.
- L2: `import { StepExecutionError } from "@/lib/utils/errors";` imports from `@/lib/utils/errors` so this module can use that dependency.
- L3: `import type { StepInput, StepOutput, StepRunner } from "@/lib/engine/step-runners/types";` imports from `@/lib/engine/step-runners/types` so this module can use that dependency.

### Functions and components
- L5: **TransformRunner** (exported class) - signature: `export class TransformRunner implements StepRunner {`.

### Ordered walkthrough
- L1: `import { VM } from "vm2";` - Imports a dependency so this module can use external functionality.
- L2: `import { StepExecutionError } from "@/lib/utils/errors";` - Imports a dependency so this module can use external functionality.
- L3: `import type { StepInput, StepOutput, StepRunner } from "@/lib/engine/step-runners/types";` - Imports a dependency so this module can use external functionality.
- L5: `export class TransformRunner implements StepRunner {` - Defines a class that groups behavior and state under one abstraction.
- L6: `async execute(input: StepInput, config: Record<string, unknown>): Promise<StepOutput> {` - Contributes to the local implementation details in this scope.
- L7: `const code = typeof config.code === "string" ? config.code : "return input;";` - Declares a constant used to hold configuration, state, or helper logic in this scope.
- L9: `try {` - Starts guarded execution for operations that may throw.
- L10: `const vm = new VM({` - Declares a constant used to hold configuration, state, or helper logic in this scope.
- L11: `timeout: 2000,` - Contributes to the local implementation details in this scope.
- L12: `sandbox: {` - Contributes to the local implementation details in this scope.
- L13: `input: input.data,` - Contributes to the local implementation details in this scope.
- L14: `},` - Contributes to the local implementation details in this scope.
- L15: `});` - Contributes to the local implementation details in this scope.
- L17: `const result = vm.run(\`(function transform(){ ${code} })()\`);` - Declares a constant used to hold configuration, state, or helper logic in this scope.
- L19: `if (result === undefined) {` - Branches control flow so different code paths run under different conditions.
- L20: `throw new StepExecutionError("Transform must return a value", "TRANSFORM_NO_RETURN");` - Raises an error intentionally so callers can react to failure.
- L21: `}` - Contributes to the local implementation details in this scope.
- L23: `return {` - Returns data/UI to the caller, ending the current function path.
- L24: `data: {` - Contributes to the local implementation details in this scope.
- L25: `result,` - Contributes to the local implementation details in this scope.
- L26: `},` - Contributes to the local implementation details in this scope.
- L27: `};` - Contributes to the local implementation details in this scope.
- L28: `} catch (error: unknown) {` - Contributes to the local implementation details in this scope.
- L29: `throw new StepExecutionError(` - Raises an error intentionally so callers can react to failure.
- L30: `error instanceof Error ? error.message : "Transform execution failed",` - Contributes to the local implementation details in this scope.
- L31: `"TRANSFORM_RUNTIME_ERROR",` - Contributes to the local implementation details in this scope.
- L32: `);` - Contributes to the local implementation details in this scope.
- L33: `}` - Contributes to the local implementation details in this scope.
- L34: `}` - Contributes to the local implementation details in this scope.
- L35: `}` - Contributes to the local implementation details in this scope.

### State management
This file is mostly stateless. Most values are local constants or function parameters.

### Scope and closures
- L7: Module/function-scoped constant provides stable reference.
- L10: Module/function-scoped constant provides stable reference.
- L17: Module/function-scoped constant provides stable reference.

### Control flow
- L9: Protected block for expected fallible operations.
- L19: Conditional branch chooses behavior based on runtime input.

### Side effects
No major external side effects; this file mostly shapes data or UI.

### TypeScript types and contracts
- L6: Promise return type signals async contract.
- L6: Generic type parameter constrains data shape.

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
