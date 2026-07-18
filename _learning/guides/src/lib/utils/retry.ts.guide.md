# Guide: src/lib/utils/retry.ts

## Purpose
This file contains shared utility logic used by multiple layers (API, engine, queue, and worker).

## Line-by-line walkthrough

### Imports (what and why)
- This file has no explicit imports (or uses runtime globals).

### Functions and components
- L7: **sleep** (exported async function) - signature: `export async function sleep(ms: number): Promise<void> {`.
- L11: **computeBackoff** (exported function) - signature: `export function computeBackoff(attempt: number, options: RetryOptions): number {`.

### Ordered walkthrough
- L1: `export interface RetryOptions {` - Defines a TypeScript interface contract that constrains object shape at compile time.
- L2: `maxRetries: number;` - Contributes to the local implementation details in this scope.
- L3: `backoffMs: number;` - Contributes to the local implementation details in this scope.
- L4: `backoffMultiplier: number;` - Contributes to the local implementation details in this scope.
- L5: `}` - Contributes to the local implementation details in this scope.
- L7: `export async function sleep(ms: number): Promise<void> {` - Defines a function entrypoint that encapsulates one unit of behavior.
- L8: `await new Promise((resolve) => setTimeout(resolve, ms));` - Contributes to the local implementation details in this scope.
- L9: `}` - Contributes to the local implementation details in this scope.
- L11: `export function computeBackoff(attempt: number, options: RetryOptions): number {` - Defines a function entrypoint that encapsulates one unit of behavior.
- L12: `return Math.round(options.backoffMs * options.backoffMultiplier ** Math.max(0, attempt - 1));` - Returns data/UI to the caller, ending the current function path.
- L13: `}` - Contributes to the local implementation details in this scope.

### State management
- L8: `await new Promise((resolve) => setTimeout(resolve, ms));` affects state ownership or updates.

### Scope and closures
Scope is straightforward: module-level constants and function-local variables with no tricky closure behavior.

### Control flow
Control flow is mostly linear: input comes in, transformations run, and a value is returned.

### Side effects
No major external side effects; this file mostly shapes data or UI.

### TypeScript types and contracts
- L1: Interface defines structural contract.
- L7: Promise return type signals async contract.

## Concepts taught by this file
- TypeScript type contracts
- async/await control flow

## Common mistakes
- Changing this file without updating dependent modules.
- Ignoring edge-case error paths.
- Skipping tests/docs for behavior changes.

## Mini exercises
- Rename one variable to improve clarity, then explain why readability improved.
- Add one guard for invalid input and document expected behavior.
- Trace one value from input to output in this file and write the path as comments.

## Further reading
- TypeScript type contracts: search for "TypeScript interfaces vs types"
- async/await control flow: search for "JavaScript async await error handling"
