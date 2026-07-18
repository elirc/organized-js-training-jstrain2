# Guide: src/stores/workflow-builder.store.ts

## Purpose
This file defines client-side state with Zustand for the workflow builder UI.

## Line-by-line walkthrough

### Imports (what and why)
- L3: `import { create } from "zustand";` imports from `zustand` so this module can use that dependency.

### Functions and components
- No named function/class declarations were detected; behavior may be configuration/data declarations.

### Ordered walkthrough
- L1: `"use client";` - Contributes to the local implementation details in this scope.
- L3: `import { create } from "zustand";` - Imports a dependency so this module can use external functionality.
- L5: `export type BuilderStepType = "http_request" | "transform" | "condition" | "delay" | "webhook_send" | "loop";` - Defines a TypeScript type alias used to make data contracts explicit.
- L7: `export interface BuilderStep {` - Defines a TypeScript interface contract that constrains object shape at compile time.
- L8: `id: string;` - Contributes to the local implementation details in this scope.
- L9: `name: string;` - Contributes to the local implementation details in this scope.
- L10: `stepType: BuilderStepType;` - Contributes to the local implementation details in this scope.
- L11: `config: Record<string, unknown>;` - Contributes to the local implementation details in this scope.
- L12: `}` - Contributes to the local implementation details in this scope.
- L14: `interface WorkflowBuilderState {` - Defines a TypeScript interface contract that constrains object shape at compile time.
- L15: `steps: BuilderStep[];` - Contributes to the local implementation details in this scope.
- L16: `selectedStepId: string | null;` - Contributes to the local implementation details in this scope.
- L17: `zoom: number;` - Contributes to the local implementation details in this scope.
- L18: `addStep: (stepType: BuilderStepType) => void;` - Contributes to the local implementation details in this scope.
- L19: `selectStep: (id: string | null) => void;` - Contributes to the local implementation details in this scope.
- L20: `updateStepConfig: (id: string, config: Record<string, unknown>) => void;` - Contributes to the local implementation details in this scope.
- L21: `}` - Contributes to the local implementation details in this scope.
- L23: `export const useWorkflowBuilderStore = create<WorkflowBuilderState>((set) => ({` - Declares a constant used to hold configuration, state, or helper logic in this scope.
- L24: `steps: [],` - Contributes to the local implementation details in this scope.
- L25: `selectedStepId: null,` - Contributes to the local implementation details in this scope.
- L26: `zoom: 1,` - Contributes to the local implementation details in this scope.
- L27: `addStep: (stepType) =>` - Contributes to the local implementation details in this scope.
- L28: `set((state) => {` - Contributes to the local implementation details in this scope.
- L29: `const id = crypto.randomUUID();` - Declares a constant used to hold configuration, state, or helper logic in this scope.
- L30: `const step: BuilderStep = {` - Declares a constant used to hold configuration, state, or helper logic in this scope.
- L31: `id,` - Contributes to the local implementation details in this scope.
- L32: `name: \`${stepType.replace("_", " ")} ${state.steps.length + 1}\`,` - Contributes to the local implementation details in this scope.
- L33: `stepType,` - Contributes to the local implementation details in this scope.
- L34: `config: {},` - Contributes to the local implementation details in this scope.
- L35: `};` - Contributes to the local implementation details in this scope.
- L37: `return {` - Returns data/UI to the caller, ending the current function path.
- L38: `steps: [...state.steps, step],` - Contributes to the local implementation details in this scope.
- L39: `selectedStepId: id,` - Contributes to the local implementation details in this scope.
- L40: `};` - Contributes to the local implementation details in this scope.
- L41: `}),` - Contributes to the local implementation details in this scope.
- L42: `selectStep: (id) => set({ selectedStepId: id }),` - Contributes to the local implementation details in this scope.
- L43: `updateStepConfig: (id, config) =>` - Contributes to the local implementation details in this scope.
- L44: `set((state) => ({` - Contributes to the local implementation details in this scope.
- L45: `steps: state.steps.map((step) => (step.id === id ? { ...step, config } : step)),` - Contributes to the local implementation details in this scope.
- L46: `})),` - Contributes to the local implementation details in this scope.
- L47: `}));` - Contributes to the local implementation details in this scope.

### State management
- L23: `export const useWorkflowBuilderStore = create<WorkflowBuilderState>((set) => ({` affects state ownership or updates.
- L28: `set((state) => {` affects state ownership or updates.
- L42: `selectStep: (id) => set({ selectedStepId: id }),` affects state ownership or updates.
- L44: `set((state) => ({` affects state ownership or updates.

### Scope and closures
- L29: Module/function-scoped constant provides stable reference.
- L30: Module/function-scoped constant provides stable reference.
- L45: Callback closure captures variables from outer scope.

### Control flow
Control flow is mostly linear: input comes in, transformations run, and a value is returned.

### Side effects
No major external side effects; this file mostly shapes data or UI.

### TypeScript types and contracts
- L5: Type alias encodes domain vocabulary.
- L7: Interface defines structural contract.
- L11: Generic type parameter constrains data shape.
- L14: Interface defines structural contract.
- L20: Generic type parameter constrains data shape.

## Concepts taught by this file
- state management (useState/useStore)
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
- state management (useState/useStore): search for "React useState and Zustand basics"
- TypeScript type contracts: search for "TypeScript interfaces vs types"
- configuration as code: search for "Twelve-Factor App config"
