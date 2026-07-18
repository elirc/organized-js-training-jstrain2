# Guide: src/lib/engine/step-runners/types.ts

## Purpose
This file is part of the workflow execution engine. It transforms workflow definitions into runtime behavior with retries, branching, and run logging.

## Line-by-line walkthrough

### Imports (what and why)
- L1: `import type { RunContext } from "@/lib/engine/context";` imports from `@/lib/engine/context` so this module can use that dependency.

### Functions and components
- No named function/class declarations were detected; behavior may be configuration/data declarations.

### Ordered walkthrough
- L1: `import type { RunContext } from "@/lib/engine/context";` - Imports a dependency so this module can use external functionality.
- L3: `export interface StepInput {` - Defines a TypeScript interface contract that constrains object shape at compile time.
- L4: `data: Record<string, unknown>;` - Contributes to the local implementation details in this scope.
- L5: `metadata: {` - Contributes to the local implementation details in this scope.
- L6: `runId: string;` - Contributes to the local implementation details in this scope.
- L7: `stepId: string;` - Contributes to the local implementation details in this scope.
- L8: `attempt: number;` - Contributes to the local implementation details in this scope.
- L9: `};` - Contributes to the local implementation details in this scope.
- L10: `}` - Contributes to the local implementation details in this scope.
- L12: `export interface StepOutput {` - Defines a TypeScript interface contract that constrains object shape at compile time.
- L13: `data: Record<string, unknown>;` - Contributes to the local implementation details in this scope.
- L14: `metadata?: Record<string, unknown>;` - Contributes to the local implementation details in this scope.
- L15: `}` - Contributes to the local implementation details in this scope.
- L17: `export interface StepRunner {` - Defines a TypeScript interface contract that constrains object shape at compile time.
- L18: `execute(input: StepInput, config: Record<string, unknown>, context: RunContext): Promise<StepOutput>;` - Contributes to the local implementation details in this scope.
- L19: `}` - Contributes to the local implementation details in this scope.

### State management
This file is mostly stateless. Most values are local constants or function parameters.

### Scope and closures
Scope is straightforward: module-level constants and function-local variables with no tricky closure behavior.

### Control flow
Control flow is mostly linear: input comes in, transformations run, and a value is returned.

### Side effects
No major external side effects; this file mostly shapes data or UI.

### TypeScript types and contracts
- L3: Interface defines structural contract.
- L4: Generic type parameter constrains data shape.
- L12: Interface defines structural contract.
- L13: Generic type parameter constrains data shape.
- L14: Generic type parameter constrains data shape.
- L17: Interface defines structural contract.
- L18: Promise return type signals async contract.
- L18: Generic type parameter constrains data shape.

## Concepts taught by this file
- TypeScript type contracts
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
- configuration as code: search for "Twelve-Factor App config"
