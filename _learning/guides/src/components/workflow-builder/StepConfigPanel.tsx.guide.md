# Guide: src/components/workflow-builder/StepConfigPanel.tsx

## Purpose
This file defines a reusable UI component. It packages rendering logic and behavior behind a focused interface.

## Line-by-line walkthrough

### Imports (what and why)
- L3: `import { useMemo } from "react";` imports from `react` so this module can use that dependency.
- L4: `import { useWorkflowBuilderStore } from "@/stores/workflow-builder.store";` imports from `@/stores/workflow-builder.store` so this module can use that dependency.

### Functions and components
- L6: **StepConfigPanel** (exported function) - signature: `export function StepConfigPanel() {`.

### Ordered walkthrough
- L1: `"use client";` - Contributes to the local implementation details in this scope.
- L3: `import { useMemo } from "react";` - Imports a dependency so this module can use external functionality.
- L4: `import { useWorkflowBuilderStore } from "@/stores/workflow-builder.store";` - Imports a dependency so this module can use external functionality.
- L6: `export function StepConfigPanel() {` - Defines a function entrypoint that encapsulates one unit of behavior.
- L7: `const { steps, selectedStepId, updateStepConfig } = useWorkflowBuilderStore();` - Declares a constant used to hold configuration, state, or helper logic in this scope.
- L8: `const selected = useMemo(() => steps.find((item) => item.id === selectedStepId), [steps, selectedStepId]);` - Declares a constant used to hold configuration, state, or helper logic in this scope.
- L10: `if (!selected) {` - Branches control flow so different code paths run under different conditions.
- L11: `return (` - Returns data/UI to the caller, ending the current function path.
- L12: `<aside className="rounded-xl border border-slate-200 bg-white p-4 text-sm text-slate-500">Select a step to configure it.</aside>` - Declares JSX UI structure rendered by this React component.
- L13: `);` - Contributes to the local implementation details in this scope.
- L14: `}` - Contributes to the local implementation details in this scope.
- L16: `return (` - Returns data/UI to the caller, ending the current function path.
- L17: `<aside className="rounded-xl border border-slate-200 bg-white p-4">` - Declares JSX UI structure rendered by this React component.
- L18: `<h2 className="text-sm font-semibold">Step Config</h2>` - Declares JSX UI structure rendered by this React component.
- L19: `<p className="mt-1 text-xs text-slate-500">{selected.name}</p>` - Declares JSX UI structure rendered by this React component.
- L20: `<textarea` - Declares JSX UI structure rendered by this React component.
- L21: `className="mt-3 min-h-[180px] w-full rounded-md border border-slate-300 p-2 text-xs font-mono"` - Declares JSX UI structure rendered by this React component.
- L22: `value={JSON.stringify(selected.config, null, 2)}` - Contributes to the local implementation details in this scope.
- L23: `onChange={(event) => {` - Contributes to the local implementation details in this scope.
- L24: `try {` - Starts guarded execution for operations that may throw.
- L25: `const parsed = JSON.parse(event.target.value) as Record<string, unknown>;` - Declares a constant used to hold configuration, state, or helper logic in this scope.
- L26: `updateStepConfig(selected.id, parsed);` - Contributes to the local implementation details in this scope.
- L27: `} catch {` - Contributes to the local implementation details in this scope.
- L28: `// keep editor editable during invalid JSON` - Comment describing intent or constraints for future maintainers.
- L29: `}` - Contributes to the local implementation details in this scope.
- L30: `}}` - Contributes to the local implementation details in this scope.
- L31: `/>` - Contributes to the local implementation details in this scope.
- L32: `</aside>` - Declares JSX UI structure rendered by this React component.
- L33: `);` - Contributes to the local implementation details in this scope.
- L34: `}` - Contributes to the local implementation details in this scope.

### State management
This file is mostly stateless. Most values are local constants or function parameters.

### Scope and closures
- L7: Module/function-scoped constant provides stable reference.
- L25: Module/function-scoped constant provides stable reference.

### Control flow
- L10: Conditional branch chooses behavior based on runtime input.
- L24: Protected block for expected fallible operations.

### Side effects
No major external side effects; this file mostly shapes data or UI.

### TypeScript types and contracts
- L25: Generic type parameter constrains data shape.

## Concepts taught by this file
- react component composition
- configuration as code

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
- configuration as code: search for "Twelve-Factor App config"
