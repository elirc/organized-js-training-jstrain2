# Guide: src/hooks/useWorkflowBuilder.ts

## Purpose
This file defines a custom React hook that encapsulates reusable stateful behavior.

## Line-by-line walkthrough

### Imports (what and why)
- L3: `import { useMemo } from "react";` imports from `react` so this module can use that dependency.
- L4: `import { useWorkflowBuilderStore } from "@/stores/workflow-builder.store";` imports from `@/stores/workflow-builder.store` so this module can use that dependency.

### Functions and components
- L6: **useWorkflowBuilder** (exported function) - signature: `export function useWorkflowBuilder() {`.

### Ordered walkthrough
- L1: `"use client";` - Contributes to the local implementation details in this scope.
- L3: `import { useMemo } from "react";` - Imports a dependency so this module can use external functionality.
- L4: `import { useWorkflowBuilderStore } from "@/stores/workflow-builder.store";` - Imports a dependency so this module can use external functionality.
- L6: `export function useWorkflowBuilder() {` - Defines a function entrypoint that encapsulates one unit of behavior.
- L7: `const store = useWorkflowBuilderStore();` - Declares a constant used to hold configuration, state, or helper logic in this scope.
- L9: `return useMemo(` - Returns data/UI to the caller, ending the current function path.
- L10: `() => ({` - Contributes to the local implementation details in this scope.
- L11: `steps: store.steps,` - Contributes to the local implementation details in this scope.
- L12: `selectedStepId: store.selectedStepId,` - Contributes to the local implementation details in this scope.
- L13: `addStep: store.addStep,` - Contributes to the local implementation details in this scope.
- L14: `selectStep: store.selectStep,` - Contributes to the local implementation details in this scope.
- L15: `updateStepConfig: store.updateStepConfig,` - Contributes to the local implementation details in this scope.
- L16: `}),` - Contributes to the local implementation details in this scope.
- L17: `[store],` - Contributes to the local implementation details in this scope.
- L18: `);` - Contributes to the local implementation details in this scope.
- L19: `}` - Contributes to the local implementation details in this scope.

### State management
This file is mostly stateless. Most values are local constants or function parameters.

### Scope and closures
- L7: Module/function-scoped constant provides stable reference.

### Control flow
Control flow is mostly linear: input comes in, transformations run, and a value is returned.

### Side effects
No major external side effects; this file mostly shapes data or UI.

### TypeScript types and contracts
Type usage is light here; contracts are mostly inferred from function signatures and library types.

## Concepts taught by this file
- basic module structure

## Common mistakes
- Storing derived UI values in state instead of deriving from props/store.
- Forgetting cleanup in effects/listeners.
- Over-coupling component UI to backend response shape.

## Mini exercises
- Add a loading/error UI state and wire it to current data flow.
- Refactor one repeated JSX block into a small reusable subcomponent.
- Add a tiny interaction test for one user action in this file.

## Further reading
- module design basics: search for "module design basics"
