# Guide: src/types/step.ts

## Purpose
This file defines TypeScript types that shape data contracts between modules and reduce runtime bugs.

## Line-by-line walkthrough

### Imports (what and why)
- This file has no explicit imports (or uses runtime globals).

### Functions and components
- No named function/class declarations were detected; behavior may be configuration/data declarations.

### Ordered walkthrough
- L1: `export type StepType =` - Defines a TypeScript type alias used to make data contracts explicit.
- L2: `| "http_request"` - Contributes to the local implementation details in this scope.
- L3: `| "transform"` - Contributes to the local implementation details in this scope.
- L4: `| "condition"` - Contributes to the local implementation details in this scope.
- L5: `| "delay"` - Contributes to the local implementation details in this scope.
- L6: `| "webhook_send"` - Contributes to the local implementation details in this scope.
- L7: `| "loop";` - Contributes to the local implementation details in this scope.
- L9: `export interface RetryConfig {` - Defines a TypeScript interface contract that constrains object shape at compile time.
- L10: `maxRetries: number;` - Contributes to the local implementation details in this scope.
- L11: `backoffMs: number;` - Contributes to the local implementation details in this scope.
- L12: `backoffMultiplier: number;` - Contributes to the local implementation details in this scope.
- L13: `}` - Contributes to the local implementation details in this scope.
- L15: `export interface WorkflowStep {` - Defines a TypeScript interface contract that constrains object shape at compile time.
- L16: `id: string;` - Contributes to the local implementation details in this scope.
- L17: `workflowId: string;` - Contributes to the local implementation details in this scope.
- L18: `stepType: StepType;` - Contributes to the local implementation details in this scope.
- L19: `name: string;` - Contributes to the local implementation details in this scope.
- L20: `position: number;` - Contributes to the local implementation details in this scope.
- L21: `config: Record<string, unknown>;` - Contributes to the local implementation details in this scope.
- L22: `inputMapping: Record<string, unknown>;` - Contributes to the local implementation details in this scope.
- L23: `timeoutMs: number;` - Contributes to the local implementation details in this scope.
- L24: `retryConfig: RetryConfig;` - Contributes to the local implementation details in this scope.
- L25: `onFailure: "stop" | "continue" | \`goto:${string}\`;` - Contributes to the local implementation details in this scope.
- L26: `nextStepId: string | null;` - Contributes to the local implementation details in this scope.
- L27: `conditionBranches: Array<{ expression: string; nextStepId: string }> | null;` - Contributes to the local implementation details in this scope.
- L28: `}` - Contributes to the local implementation details in this scope.

### State management
This file is mostly stateless. Most values are local constants or function parameters.

### Scope and closures
Scope is straightforward: module-level constants and function-local variables with no tricky closure behavior.

### Control flow
Control flow is mostly linear: input comes in, transformations run, and a value is returned.

### Side effects
No major external side effects; this file mostly shapes data or UI.

### TypeScript types and contracts
- L1: Type alias encodes domain vocabulary.
- L9: Interface defines structural contract.
- L15: Interface defines structural contract.
- L21: Generic type parameter constrains data shape.
- L22: Generic type parameter constrains data shape.
- L27: Generic type parameter constrains data shape.

## Concepts taught by this file
- TypeScript type contracts
- configuration as code

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
- configuration as code: search for "Twelve-Factor App config"
