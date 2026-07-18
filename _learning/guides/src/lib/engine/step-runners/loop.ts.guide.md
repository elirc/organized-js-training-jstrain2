# Guide: src/lib/engine/step-runners/loop.ts

## Purpose
This file is part of the workflow execution engine. It transforms workflow definitions into runtime behavior with retries, branching, and run logging.

## Line-by-line walkthrough

### Imports (what and why)
- L1: `import type { StepInput, StepOutput, StepRunner } from "@/lib/engine/step-runners/types";` imports from `@/lib/engine/step-runners/types` so this module can use that dependency.

### Functions and components
- L3: **getByPath** (function) - signature: `function getByPath(value: unknown, path: string): unknown {`.
- L17: **LoopRunner** (exported class) - signature: `export class LoopRunner implements StepRunner {`.

### Ordered walkthrough
- L1: `import type { StepInput, StepOutput, StepRunner } from "@/lib/engine/step-runners/types";` - Imports a dependency so this module can use external functionality.
- L3: `function getByPath(value: unknown, path: string): unknown {` - Defines a function entrypoint that encapsulates one unit of behavior.
- L4: `const parts = path.split(".").filter(Boolean);` - Declares a constant used to hold configuration, state, or helper logic in this scope.
- L5: `let current = value;` - Declares mutable state inside this module scope.
- L7: `for (const part of parts) {` - Iterates over data to apply repeated behavior.
- L8: `if (!current || typeof current !== "object") {` - Branches control flow so different code paths run under different conditions.
- L9: `return undefined;` - Returns data/UI to the caller, ending the current function path.
- L10: `}` - Contributes to the local implementation details in this scope.
- L11: `current = (current as Record<string, unknown>)[part];` - Contributes to the local implementation details in this scope.
- L12: `}` - Contributes to the local implementation details in this scope.
- L14: `return current;` - Returns data/UI to the caller, ending the current function path.
- L15: `}` - Contributes to the local implementation details in this scope.
- L17: `export class LoopRunner implements StepRunner {` - Defines a class that groups behavior and state under one abstraction.
- L18: `async execute(input: StepInput, config: Record<string, unknown>): Promise<StepOutput> {` - Contributes to the local implementation details in this scope.
- L19: `const arrayPath = typeof config.arrayPath === "string" ? config.arrayPath : "";` - Declares a constant used to hold configuration, state, or helper logic in this scope.
- L20: `const list = getByPath(input.data, arrayPath);` - Declares a constant used to hold configuration, state, or helper logic in this scope.
- L22: `if (!Array.isArray(list)) {` - Branches control flow so different code paths run under different conditions.
- L23: `return {` - Returns data/UI to the caller, ending the current function path.
- L24: `data: {` - Contributes to the local implementation details in this scope.
- L25: `results: [],` - Contributes to the local implementation details in this scope.
- L26: `},` - Contributes to the local implementation details in this scope.
- L27: `};` - Contributes to the local implementation details in this scope.
- L28: `}` - Contributes to the local implementation details in this scope.
- L30: `return {` - Returns data/UI to the caller, ending the current function path.
- L31: `data: {` - Contributes to the local implementation details in this scope.
- L32: `results: list.map((item) => ({ item })),` - Contributes to the local implementation details in this scope.
- L33: `},` - Contributes to the local implementation details in this scope.
- L34: `};` - Contributes to the local implementation details in this scope.
- L35: `}` - Contributes to the local implementation details in this scope.
- L36: `}` - Contributes to the local implementation details in this scope.

### State management
This file is mostly stateless. Most values are local constants or function parameters.

### Scope and closures
- L4: Module/function-scoped constant provides stable reference.
- L19: Module/function-scoped constant provides stable reference.
- L20: Module/function-scoped constant provides stable reference.
- L32: Callback closure captures variables from outer scope.

### Control flow
- L7: Loop processes repeated data/work.
- L8: Conditional branch chooses behavior based on runtime input.
- L22: Conditional branch chooses behavior based on runtime input.

### Side effects
No major external side effects; this file mostly shapes data or UI.

### TypeScript types and contracts
- L11: Generic type parameter constrains data shape.
- L18: Promise return type signals async contract.
- L18: Generic type parameter constrains data shape.

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
