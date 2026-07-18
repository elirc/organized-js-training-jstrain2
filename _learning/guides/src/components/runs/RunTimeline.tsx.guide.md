# Guide: src/components/runs/RunTimeline.tsx

## Purpose
This file defines a reusable UI component. It packages rendering logic and behavior behind a focused interface.

## Line-by-line walkthrough

### Imports (what and why)
- L3: `import { useRunStream } from "@/hooks/useRunStream";` imports from `@/hooks/useRunStream` so this module can use that dependency.
- L4: `import { RunStatusBadge } from "@/components/runs/RunStatusBadge";` imports from `@/components/runs/RunStatusBadge` so this module can use that dependency.

### Functions and components
- L6: **RunTimeline** (exported function) - signature: `export function RunTimeline({ runId }: { runId: string }) {`.

### Ordered walkthrough
- L1: `"use client";` - Contributes to the local implementation details in this scope.
- L3: `import { useRunStream } from "@/hooks/useRunStream";` - Imports a dependency so this module can use external functionality.
- L4: `import { RunStatusBadge } from "@/components/runs/RunStatusBadge";` - Imports a dependency so this module can use external functionality.
- L6: `export function RunTimeline({ runId }: { runId: string }) {` - Defines a function entrypoint that encapsulates one unit of behavior.
- L7: `const { events, isConnected } = useRunStream(runId);` - Declares a constant used to hold configuration, state, or helper logic in this scope.
- L9: `return (` - Returns data/UI to the caller, ending the current function path.
- L10: `<div className="mt-6 rounded-xl border border-slate-200 bg-white p-4">` - Declares JSX UI structure rendered by this React component.
- L11: `<div className="mb-3 flex items-center justify-between">` - Declares JSX UI structure rendered by this React component.
- L12: `<h2 className="text-lg font-semibold">Timeline</h2>` - Declares JSX UI structure rendered by this React component.
- L13: `<div className="flex items-center gap-2">` - Declares JSX UI structure rendered by this React component.
- L14: `<span className={\`h-2 w-2 rounded-full ${isConnected ? "bg-emerald-500" : "bg-rose-500"}\`} />` - Declares JSX UI structure rendered by this React component.
- L15: `<span className="text-xs text-slate-500">{isConnected ? "Connected" : "Disconnected"}</span>` - Declares JSX UI structure rendered by this React component.
- L16: `</div>` - Declares JSX UI structure rendered by this React component.
- L17: `</div>` - Declares JSX UI structure rendered by this React component.
- L18: `<div className="space-y-2">` - Declares JSX UI structure rendered by this React component.
- L19: `{events.length === 0 ? <p className="text-sm text-slate-500">No events yet.</p> : null}` - Declares JSX UI structure rendered by this React component.
- L20: `{events.map((event, idx) => (` - Contributes to the local implementation details in this scope.
- L21: `<div key={\`${event.event}-${idx}\`} className="flex items-center justify-between rounded-md border border-slate-200 p-2 text-sm">` - Declares JSX UI structure rendered by this React component.
- L22: `<span>{event.event}</span>` - Declares JSX UI structure rendered by this React component.
- L23: `<RunStatusBadge status={event.status ?? "pending"} />` - Declares JSX UI structure rendered by this React component.
- L24: `</div>` - Declares JSX UI structure rendered by this React component.
- L25: `))}` - Contributes to the local implementation details in this scope.
- L26: `</div>` - Declares JSX UI structure rendered by this React component.
- L27: `</div>` - Declares JSX UI structure rendered by this React component.
- L28: `);` - Contributes to the local implementation details in this scope.
- L29: `}` - Contributes to the local implementation details in this scope.

### State management
This file is mostly stateless. Most values are local constants or function parameters.

### Scope and closures
- L7: Module/function-scoped constant provides stable reference.
- L20: Callback closure captures variables from outer scope.

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
