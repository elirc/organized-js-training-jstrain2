# Guide: src/components/runs/RunStatusBadge.tsx

## Purpose
This file defines a reusable UI component. It packages rendering logic and behavior behind a focused interface.

## Line-by-line walkthrough

### Imports (what and why)
- This file has no explicit imports (or uses runtime globals).

### Functions and components
- L10: **RunStatusBadge** (exported function) - signature: `export function RunStatusBadge({ status }: { status: string }) {`.

### Ordered walkthrough
- L1: `const styleByStatus: Record<string, string> = {` - Declares a constant used to hold configuration, state, or helper logic in this scope.
- L2: `pending: "bg-slate-100 text-slate-700",` - Contributes to the local implementation details in this scope.
- L3: `running: "bg-blue-100 text-blue-700",` - Contributes to the local implementation details in this scope.
- L4: `completed: "bg-emerald-100 text-emerald-700",` - Contributes to the local implementation details in this scope.
- L5: `failed: "bg-rose-100 text-rose-700",` - Contributes to the local implementation details in this scope.
- L6: `retrying: "bg-amber-100 text-amber-700",` - Contributes to the local implementation details in this scope.
- L7: `dead_letter: "bg-orange-100 text-orange-700",` - Contributes to the local implementation details in this scope.
- L8: `};` - Contributes to the local implementation details in this scope.
- L10: `export function RunStatusBadge({ status }: { status: string }) {` - Defines a function entrypoint that encapsulates one unit of behavior.
- L11: `return <span className={\`rounded-full px-2 py-1 text-xs ${styleByStatus[status] ?? styleByStatus.pending}\`}>{status}</span>;` - Returns data/UI to the caller, ending the current function path.
- L12: `}` - Contributes to the local implementation details in this scope.

### State management
This file is mostly stateless. Most values are local constants or function parameters.

### Scope and closures
- L1: Module/function-scoped constant provides stable reference.

### Control flow
Control flow is mostly linear: input comes in, transformations run, and a value is returned.

### Side effects
No major external side effects; this file mostly shapes data or UI.

### TypeScript types and contracts
- L1: Generic type parameter constrains data shape.

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
