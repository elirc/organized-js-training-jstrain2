# Guide: src/components/dashboard/WorkflowCard.tsx

## Purpose
This file defines a reusable UI component. It packages rendering logic and behavior behind a focused interface.

## Line-by-line walkthrough

### Imports (what and why)
- L1: `import { RunStatusBadge } from "@/components/runs/RunStatusBadge";` imports from `@/components/runs/RunStatusBadge` so this module can use that dependency.

### Functions and components
- L3: **WorkflowCard** (exported function) - signature: `export function WorkflowCard({ name, status }: { name: string; status: string }) {`.

### Ordered walkthrough
- L1: `import { RunStatusBadge } from "@/components/runs/RunStatusBadge";` - Imports a dependency so this module can use external functionality.
- L3: `export function WorkflowCard({ name, status }: { name: string; status: string }) {` - Defines a function entrypoint that encapsulates one unit of behavior.
- L4: `return (` - Returns data/UI to the caller, ending the current function path.
- L5: `<div className="rounded-xl border border-slate-200 bg-white p-4">` - Declares JSX UI structure rendered by this React component.
- L6: `<p className="text-sm font-medium">{name}</p>` - Declares JSX UI structure rendered by this React component.
- L7: `<div className="mt-2">` - Declares JSX UI structure rendered by this React component.
- L8: `<RunStatusBadge status={status} />` - Declares JSX UI structure rendered by this React component.
- L9: `</div>` - Declares JSX UI structure rendered by this React component.
- L10: `</div>` - Declares JSX UI structure rendered by this React component.
- L11: `);` - Contributes to the local implementation details in this scope.
- L12: `}` - Contributes to the local implementation details in this scope.

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
