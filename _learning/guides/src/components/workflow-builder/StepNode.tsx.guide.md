# Guide: src/components/workflow-builder/StepNode.tsx

## Purpose
This file defines a reusable UI component. It packages rendering logic and behavior behind a focused interface.

## Line-by-line walkthrough

### Imports (what and why)
- L3: `import type { BuilderStep } from "@/stores/workflow-builder.store";` imports from `@/stores/workflow-builder.store` so this module can use that dependency.

### Functions and components
- L5: **StepNode** (exported function) - signature: `export function StepNode({`.

### Ordered walkthrough
- L1: `"use client";` - Contributes to the local implementation details in this scope.
- L3: `import type { BuilderStep } from "@/stores/workflow-builder.store";` - Imports a dependency so this module can use external functionality.
- L5: `export function StepNode({` - Defines a function entrypoint that encapsulates one unit of behavior.
- L6: `step,` - Contributes to the local implementation details in this scope.
- L7: `active,` - Contributes to the local implementation details in this scope.
- L8: `onSelect,` - Contributes to the local implementation details in this scope.
- L9: `}: {` - Contributes to the local implementation details in this scope.
- L10: `step: BuilderStep;` - Contributes to the local implementation details in this scope.
- L11: `active: boolean;` - Contributes to the local implementation details in this scope.
- L12: `onSelect: () => void;` - Contributes to the local implementation details in this scope.
- L13: `}) {` - Contributes to the local implementation details in this scope.
- L14: `return (` - Returns data/UI to the caller, ending the current function path.
- L15: `<button` - Declares JSX UI structure rendered by this React component.
- L16: `type="button"` - Contributes to the local implementation details in this scope.
- L17: `onClick={onSelect}` - Contributes to the local implementation details in this scope.
- L18: `className={\`w-full rounded-lg border px-3 py-2 text-left ${` - Declares JSX UI structure rendered by this React component.
- L19: `active ? "border-brand-500 bg-brand-50" : "border-slate-200 bg-slate-50"` - Contributes to the local implementation details in this scope.
- L20: `}\`}` - Contributes to the local implementation details in this scope.
- L21: `>` - Contributes to the local implementation details in this scope.
- L22: `<p className="text-sm font-medium">{step.name}</p>` - Declares JSX UI structure rendered by this React component.
- L23: `<p className="text-xs uppercase tracking-wide text-slate-500">{step.stepType}</p>` - Declares JSX UI structure rendered by this React component.
- L24: `</button>` - Declares JSX UI structure rendered by this React component.
- L25: `);` - Contributes to the local implementation details in this scope.
- L26: `}` - Contributes to the local implementation details in this scope.

### State management
This file is mostly stateless. Most values are local constants or function parameters.

### Scope and closures
Scope is straightforward: module-level constants and function-local variables with no tricky closure behavior.

### Control flow
Control flow is mostly linear: input comes in, transformations run, and a value is returned.

### Side effects
No major external side effects; this file mostly shapes data or UI.

### TypeScript types and contracts
Type usage is light here; contracts are mostly inferred from function signatures and library types.

## Concepts taught by this file
- react component composition
- TypeScript type contracts

## Common mistakes
- Storing derived UI values in state instead of deriving from props/store.
- Forgetting cleanup in effects/listeners.
- Over-coupling component UI to backend response shape.

## Mini exercises
- Add a loading/error UI state and wire it to current data flow.
- Refactor one repeated JSX block into a small reusable subcomponent.
- Add a tiny interaction test for one user action in this file.

## Further reading
- react component composition: search for "React component composition patterns"
- TypeScript type contracts: search for "TypeScript interfaces vs types"
