# Guide: src/components/workflow-builder/Canvas.tsx

## Purpose
This file defines a reusable UI component. It packages rendering logic and behavior behind a focused interface.

## Line-by-line walkthrough

### Imports (what and why)
- L3: `import { useWorkflowBuilderStore } from "@/stores/workflow-builder.store";` imports from `@/stores/workflow-builder.store` so this module can use that dependency.
- L4: `import { ToolboxSidebar } from "@/components/workflow-builder/ToolboxSidebar";` imports from `@/components/workflow-builder/ToolboxSidebar` so this module can use that dependency.
- L5: `import { StepConfigPanel } from "@/components/workflow-builder/StepConfigPanel";` imports from `@/components/workflow-builder/StepConfigPanel` so this module can use that dependency.
- L6: `import { StepNode } from "@/components/workflow-builder/StepNode";` imports from `@/components/workflow-builder/StepNode` so this module can use that dependency.

### Functions and components
- L8: **WorkflowBuilderShell** (exported function) - signature: `export function WorkflowBuilderShell({ workflowId }: { workflowId: string | null }) {`.

### Ordered walkthrough
- L1: `"use client";` - Contributes to the local implementation details in this scope.
- L3: `import { useWorkflowBuilderStore } from "@/stores/workflow-builder.store";` - Imports a dependency so this module can use external functionality.
- L4: `import { ToolboxSidebar } from "@/components/workflow-builder/ToolboxSidebar";` - Imports a dependency so this module can use external functionality.
- L5: `import { StepConfigPanel } from "@/components/workflow-builder/StepConfigPanel";` - Imports a dependency so this module can use external functionality.
- L6: `import { StepNode } from "@/components/workflow-builder/StepNode";` - Imports a dependency so this module can use external functionality.
- L8: `export function WorkflowBuilderShell({ workflowId }: { workflowId: string | null }) {` - Defines a function entrypoint that encapsulates one unit of behavior.
- L9: `const { steps, addStep, selectedStepId, selectStep } = useWorkflowBuilderStore();` - Declares a constant used to hold configuration, state, or helper logic in this scope.
- L11: `return (` - Returns data/UI to the caller, ending the current function path.
- L12: `<div className="grid min-h-[560px] grid-cols-1 gap-4 lg:grid-cols-[220px_1fr_320px]">` - Declares JSX UI structure rendered by this React component.
- L13: `<ToolboxSidebar onAdd={addStep} />` - Declares JSX UI structure rendered by this React component.
- L14: `<div className="rounded-xl border border-slate-200 bg-white p-4">` - Declares JSX UI structure rendered by this React component.
- L15: `<p className="mb-3 text-xs font-medium uppercase tracking-[0.2em] text-slate-500">` - Declares JSX UI structure rendered by this React component.
- L16: `{workflowId ? \`Editing ${workflowId}\` : "New workflow"}` - Contributes to the local implementation details in this scope.
- L17: `</p>` - Declares JSX UI structure rendered by this React component.
- L18: `<div className="space-y-2">` - Declares JSX UI structure rendered by this React component.
- L19: `{steps.length === 0 ? (` - Contributes to the local implementation details in this scope.
- L20: `<p className="text-sm text-slate-500">Add a step from the toolbox.</p>` - Declares JSX UI structure rendered by this React component.
- L21: `) : (` - Contributes to the local implementation details in this scope.
- L22: `steps.map((step) => (` - Contributes to the local implementation details in this scope.
- L23: `<StepNode` - Declares JSX UI structure rendered by this React component.
- L24: `key={step.id}` - Contributes to the local implementation details in this scope.
- L25: `step={step}` - Contributes to the local implementation details in this scope.
- L26: `active={step.id === selectedStepId}` - Contributes to the local implementation details in this scope.
- L27: `onSelect={() => selectStep(step.id)}` - Contributes to the local implementation details in this scope.
- L28: `/>` - Contributes to the local implementation details in this scope.
- L29: `))` - Contributes to the local implementation details in this scope.
- L30: `)}` - Contributes to the local implementation details in this scope.
- L31: `</div>` - Declares JSX UI structure rendered by this React component.
- L32: `</div>` - Declares JSX UI structure rendered by this React component.
- L33: `<StepConfigPanel />` - Declares JSX UI structure rendered by this React component.
- L34: `</div>` - Declares JSX UI structure rendered by this React component.
- L35: `);` - Contributes to the local implementation details in this scope.
- L36: `}` - Contributes to the local implementation details in this scope.
- L38: `export default WorkflowBuilderShell;` - Contributes to the local implementation details in this scope.

### State management
This file is mostly stateless. Most values are local constants or function parameters.

### Scope and closures
- L9: Module/function-scoped constant provides stable reference.
- L22: Callback closure captures variables from outer scope.

### Control flow
Control flow is mostly linear: input comes in, transformations run, and a value is returned.

### Side effects
No major external side effects; this file mostly shapes data or UI.

### TypeScript types and contracts
Type usage is light here; contracts are mostly inferred from function signatures and library types.

## Concepts taught by this file
- react component composition

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
