# Guide: src/lib/engine/step-runners/condition.ts

## Purpose
This file is part of the workflow execution engine. It transforms workflow definitions into runtime behavior with retries, branching, and run logging.

## Line-by-line walkthrough

### Imports (what and why)
- L1: `import { StepExecutionError } from "@/lib/utils/errors";` imports from `@/lib/utils/errors` so this module can use that dependency.
- L2: `import type { StepInput, StepOutput, StepRunner } from "@/lib/engine/step-runners/types";` imports from `@/lib/engine/step-runners/types` so this module can use that dependency.

### Functions and components
- L4: **pickValue** (function) - signature: `function pickValue(source: Record<string, unknown>, path: string): unknown {`.
- L18: **evaluateExpression** (function) - signature: `function evaluateExpression(expression: string, input: Record<string, unknown>): boolean {`.
- L38: **ConditionRunner** (exported class) - signature: `export class ConditionRunner implements StepRunner {`.

### Ordered walkthrough
- L1: `import { StepExecutionError } from "@/lib/utils/errors";` - Imports a dependency so this module can use external functionality.
- L2: `import type { StepInput, StepOutput, StepRunner } from "@/lib/engine/step-runners/types";` - Imports a dependency so this module can use external functionality.
- L4: `function pickValue(source: Record<string, unknown>, path: string): unknown {` - Defines a function entrypoint that encapsulates one unit of behavior.
- L5: `const parts = path.split(".").filter(Boolean);` - Declares a constant used to hold configuration, state, or helper logic in this scope.
- L6: `let cursor: unknown = source;` - Declares mutable state inside this module scope.
- L8: `for (const part of parts) {` - Iterates over data to apply repeated behavior.
- L9: `if (!cursor || typeof cursor !== "object") {` - Branches control flow so different code paths run under different conditions.
- L10: `return undefined;` - Returns data/UI to the caller, ending the current function path.
- L11: `}` - Contributes to the local implementation details in this scope.
- L12: `cursor = (cursor as Record<string, unknown>)[part];` - Contributes to the local implementation details in this scope.
- L13: `}` - Contributes to the local implementation details in this scope.
- L15: `return cursor;` - Returns data/UI to the caller, ending the current function path.
- L16: `}` - Contributes to the local implementation details in this scope.
- L18: `function evaluateExpression(expression: string, input: Record<string, unknown>): boolean {` - Defines a function entrypoint that encapsulates one unit of behavior.
- L19: `const trimmed = expression.trim();` - Declares a constant used to hold configuration, state, or helper logic in this scope.
- L21: `if (trimmed.includes("==")) {` - Branches control flow so different code paths run under different conditions.
- L22: `const [left, right] = trimmed.split("==").map((part) => part.trim());` - Declares a constant used to hold configuration, state, or helper logic in this scope.
- L23: `const leftValue = pickValue(input, left);` - Declares a constant used to hold configuration, state, or helper logic in this scope.
- L24: `const rightValue = right.replace(/^['"]|['"]$/g, "");` - Declares a constant used to hold configuration, state, or helper logic in this scope.
- L25: `return String(leftValue) === rightValue;` - Returns data/UI to the caller, ending the current function path.
- L26: `}` - Contributes to the local implementation details in this scope.
- L28: `if (trimmed.includes("!=")) {` - Branches control flow so different code paths run under different conditions.
- L29: `const [left, right] = trimmed.split("!=").map((part) => part.trim());` - Declares a constant used to hold configuration, state, or helper logic in this scope.
- L30: `const leftValue = pickValue(input, left);` - Declares a constant used to hold configuration, state, or helper logic in this scope.
- L31: `const rightValue = right.replace(/^['"]|['"]$/g, "");` - Declares a constant used to hold configuration, state, or helper logic in this scope.
- L32: `return String(leftValue) !== rightValue;` - Returns data/UI to the caller, ending the current function path.
- L33: `}` - Contributes to the local implementation details in this scope.
- L35: `return Boolean(pickValue(input, trimmed));` - Returns data/UI to the caller, ending the current function path.
- L36: `}` - Contributes to the local implementation details in this scope.
- L38: `export class ConditionRunner implements StepRunner {` - Defines a class that groups behavior and state under one abstraction.
- L39: `async execute(input: StepInput, config: Record<string, unknown>): Promise<StepOutput> {` - Contributes to the local implementation details in this scope.
- L40: `const expression = typeof config.expression === "string" ? config.expression : "true";` - Declares a constant used to hold configuration, state, or helper logic in this scope.
- L42: `try {` - Starts guarded execution for operations that may throw.
- L43: `const passed = expression === "true" ? true : evaluateExpression(expression, input.data);` - Declares a constant used to hold configuration, state, or helper logic in this scope.
- L44: `return {` - Returns data/UI to the caller, ending the current function path.
- L45: `data: { passed },` - Contributes to the local implementation details in this scope.
- L46: `};` - Contributes to the local implementation details in this scope.
- L47: `} catch (error: unknown) {` - Contributes to the local implementation details in this scope.
- L48: `throw new StepExecutionError(` - Raises an error intentionally so callers can react to failure.
- L49: `error instanceof Error ? error.message : "Condition expression failed",` - Contributes to the local implementation details in this scope.
- L50: `"CONDITION_EVALUATION_ERROR",` - Contributes to the local implementation details in this scope.
- L51: `);` - Contributes to the local implementation details in this scope.
- L52: `}` - Contributes to the local implementation details in this scope.
- L53: `}` - Contributes to the local implementation details in this scope.
- L54: `}` - Contributes to the local implementation details in this scope.

### State management
This file is mostly stateless. Most values are local constants or function parameters.

### Scope and closures
- L5: Module/function-scoped constant provides stable reference.
- L19: Module/function-scoped constant provides stable reference.
- L22: Callback closure captures variables from outer scope.
- L23: Module/function-scoped constant provides stable reference.
- L24: Module/function-scoped constant provides stable reference.
- L29: Callback closure captures variables from outer scope.
- L30: Module/function-scoped constant provides stable reference.
- L31: Module/function-scoped constant provides stable reference.

### Control flow
- L8: Loop processes repeated data/work.
- L9: Conditional branch chooses behavior based on runtime input.
- L21: Conditional branch chooses behavior based on runtime input.
- L28: Conditional branch chooses behavior based on runtime input.
- L42: Protected block for expected fallible operations.

### Side effects
No major external side effects; this file mostly shapes data or UI.

### TypeScript types and contracts
- L4: Generic type parameter constrains data shape.
- L12: Generic type parameter constrains data shape.
- L18: Generic type parameter constrains data shape.
- L39: Promise return type signals async contract.
- L39: Generic type parameter constrains data shape.

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
