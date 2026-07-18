# Guide: src/lib/engine/context.ts

## Purpose
This file is part of the workflow execution engine. It transforms workflow definitions into runtime behavior with retries, branching, and run logging.

## Line-by-line walkthrough

### Imports (what and why)
- This file has no explicit imports (or uses runtime globals).

### Functions and components
- L6: **RunContext** (exported class) - signature: `export class RunContext {`.

### Ordered walkthrough
- L1: `export interface RunContextState {` - Defines a TypeScript interface contract that constrains object shape at compile time.
- L2: `triggerData: Record<string, unknown>;` - Contributes to the local implementation details in this scope.
- L3: `steps: Record<string, { output: Record<string, unknown> }>;` - Contributes to the local implementation details in this scope.
- L4: `}` - Contributes to the local implementation details in this scope.
- L6: `export class RunContext {` - Defines a class that groups behavior and state under one abstraction.
- L7: `private state: RunContextState;` - Contributes to the local implementation details in this scope.
- L9: `constructor(triggerData: Record<string, unknown>) {` - Contributes to the local implementation details in this scope.
- L10: `this.state = {` - Contributes to the local implementation details in this scope.
- L11: `triggerData,` - Contributes to the local implementation details in this scope.
- L12: `steps: {},` - Contributes to the local implementation details in this scope.
- L13: `};` - Contributes to the local implementation details in this scope.
- L14: `}` - Contributes to the local implementation details in this scope.
- L16: `public setStepOutput(stepName: string, output: Record<string, unknown>): void {` - Contributes to the local implementation details in this scope.
- L17: `this.state.steps[this.normalizeStepName(stepName)] = { output };` - Contributes to the local implementation details in this scope.
- L18: `}` - Contributes to the local implementation details in this scope.
- L20: `public getState(): RunContextState {` - Contributes to the local implementation details in this scope.
- L21: `return this.state;` - Returns data/UI to the caller, ending the current function path.
- L22: `}` - Contributes to the local implementation details in this scope.
- L24: `public resolvePath(path: string): unknown {` - Contributes to the local implementation details in this scope.
- L25: `const segments = path.split(".").filter(Boolean);` - Declares a constant used to hold configuration, state, or helper logic in this scope.
- L26: `let cursor: unknown = this.state;` - Declares mutable state inside this module scope.
- L28: `for (const segment of segments) {` - Iterates over data to apply repeated behavior.
- L29: `if (!cursor || typeof cursor !== "object") {` - Branches control flow so different code paths run under different conditions.
- L30: `return undefined;` - Returns data/UI to the caller, ending the current function path.
- L31: `}` - Contributes to the local implementation details in this scope.
- L32: `cursor = (cursor as Record<string, unknown>)[segment];` - Contributes to the local implementation details in this scope.
- L33: `}` - Contributes to the local implementation details in this scope.
- L35: `return cursor;` - Returns data/UI to the caller, ending the current function path.
- L36: `}` - Contributes to the local implementation details in this scope.
- L38: `public resolveTemplates(value: unknown): unknown {` - Contributes to the local implementation details in this scope.
- L39: `if (typeof value === "string") {` - Branches control flow so different code paths run under different conditions.
- L40: `return value.replace(/\{\{\s*([^{}]+?)\s*\}\}/g, (_, token: string) => {` - Returns data/UI to the caller, ending the current function path.
- L41: `const resolved = this.resolvePath(token.trim());` - Declares a constant used to hold configuration, state, or helper logic in this scope.
- L42: `return resolved === undefined ? "" : String(resolved);` - Returns data/UI to the caller, ending the current function path.
- L43: `});` - Contributes to the local implementation details in this scope.
- L44: `}` - Contributes to the local implementation details in this scope.
- L46: `if (Array.isArray(value)) {` - Branches control flow so different code paths run under different conditions.
- L47: `return value.map((item) => this.resolveTemplates(item));` - Returns data/UI to the caller, ending the current function path.
- L48: `}` - Contributes to the local implementation details in this scope.
- L50: `if (value && typeof value === "object") {` - Branches control flow so different code paths run under different conditions.
- L51: `return Object.fromEntries(` - Returns data/UI to the caller, ending the current function path.
- L52: `Object.entries(value as Record<string, unknown>).map(([key, nested]) => [key, this.resolveTemplates(nested)]),` - Contributes to the local implementation details in this scope.
- L53: `);` - Contributes to the local implementation details in this scope.
- L54: `}` - Contributes to the local implementation details in this scope.
- L56: `return value;` - Returns data/UI to the caller, ending the current function path.
- L57: `}` - Contributes to the local implementation details in this scope.
- L59: `private normalizeStepName(name: string): string {` - Contributes to the local implementation details in this scope.
- L60: `return name.trim().toLowerCase().replace(/[^a-z0-9]+/g, "_");` - Returns data/UI to the caller, ending the current function path.
- L61: `}` - Contributes to the local implementation details in this scope.
- L62: `}` - Contributes to the local implementation details in this scope.

### State management
- L16: `public setStepOutput(stepName: string, output: Record<string, unknown>): void {` affects state ownership or updates.

### Scope and closures
- L25: Module/function-scoped constant provides stable reference.
- L41: Module/function-scoped constant provides stable reference.
- L47: Callback closure captures variables from outer scope.
- L52: Callback closure captures variables from outer scope.

### Control flow
- L28: Loop processes repeated data/work.
- L29: Conditional branch chooses behavior based on runtime input.
- L39: Conditional branch chooses behavior based on runtime input.
- L46: Conditional branch chooses behavior based on runtime input.
- L50: Conditional branch chooses behavior based on runtime input.

### Side effects
No major external side effects; this file mostly shapes data or UI.

### TypeScript types and contracts
- L1: Interface defines structural contract.
- L2: Generic type parameter constrains data shape.
- L3: Generic type parameter constrains data shape.
- L9: Generic type parameter constrains data shape.
- L16: Generic type parameter constrains data shape.
- L32: Generic type parameter constrains data shape.
- L52: Generic type parameter constrains data shape.

## Concepts taught by this file
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
- TypeScript type contracts: search for "TypeScript interfaces vs types"
