# Guide: src/components/workflow-builder/ToolboxSidebar.tsx

## Purpose
This file defines a reusable UI component. It packages rendering logic and behavior behind a focused interface.

## Line-by-line walkthrough

### Imports (what and why)
- This file has no explicit imports (or uses runtime globals).

### Functions and components
- L14: **ToolboxSidebar** (exported function) - signature: `export function ToolboxSidebar({`.

### Ordered walkthrough
- L1: `"use client";` - Contributes to the local implementation details in this scope.
- L3: `type StepType = "http_request" | "transform" | "condition" | "delay" | "webhook_send" | "loop";` - Defines a TypeScript type alias used to make data contracts explicit.
- L5: `const toolbox: Array<{ label: string; stepType: StepType }> = [` - Declares a constant used to hold configuration, state, or helper logic in this scope.
- L6: `{ label: "HTTP Request", stepType: "http_request" },` - Contributes to the local implementation details in this scope.
- L7: `{ label: "Transform", stepType: "transform" },` - Contributes to the local implementation details in this scope.
- L8: `{ label: "Condition", stepType: "condition" },` - Contributes to the local implementation details in this scope.
- L9: `{ label: "Delay", stepType: "delay" },` - Contributes to the local implementation details in this scope.
- L10: `{ label: "Webhook Send", stepType: "webhook_send" },` - Contributes to the local implementation details in this scope.
- L11: `{ label: "Loop", stepType: "loop" },` - Contributes to the local implementation details in this scope.
- L12: `];` - Contributes to the local implementation details in this scope.
- L14: `export function ToolboxSidebar({` - Defines a function entrypoint that encapsulates one unit of behavior.
- L15: `onAdd,` - Contributes to the local implementation details in this scope.
- L16: `}: {` - Contributes to the local implementation details in this scope.
- L17: `onAdd: (stepType: StepType) => void;` - Contributes to the local implementation details in this scope.
- L18: `}) {` - Contributes to the local implementation details in this scope.
- L19: `return (` - Returns data/UI to the caller, ending the current function path.
- L20: `<aside className="rounded-xl border border-slate-200 bg-white p-4">` - Declares JSX UI structure rendered by this React component.
- L21: `<h2 className="mb-3 text-sm font-semibold">Toolbox</h2>` - Declares JSX UI structure rendered by this React component.
- L22: `<div className="space-y-2">` - Declares JSX UI structure rendered by this React component.
- L23: `{toolbox.map((item) => (` - Contributes to the local implementation details in this scope.
- L24: `<button` - Declares JSX UI structure rendered by this React component.
- L25: `key={item.stepType}` - Contributes to the local implementation details in this scope.
- L26: `type="button"` - Contributes to the local implementation details in this scope.
- L27: `onClick={() => onAdd(item.stepType)}` - Contributes to the local implementation details in this scope.
- L28: `className="w-full rounded-md border border-slate-200 bg-slate-50 px-3 py-2 text-left text-sm"` - Declares JSX UI structure rendered by this React component.
- L29: `>` - Contributes to the local implementation details in this scope.
- L30: `{item.label}` - Contributes to the local implementation details in this scope.
- L31: `</button>` - Declares JSX UI structure rendered by this React component.
- L32: `))}` - Contributes to the local implementation details in this scope.
- L33: `</div>` - Declares JSX UI structure rendered by this React component.
- L34: `</aside>` - Declares JSX UI structure rendered by this React component.
- L35: `);` - Contributes to the local implementation details in this scope.
- L36: `}` - Contributes to the local implementation details in this scope.

### State management
This file is mostly stateless. Most values are local constants or function parameters.

### Scope and closures
- L5: Module/function-scoped constant provides stable reference.
- L23: Callback closure captures variables from outer scope.

### Control flow
Control flow is mostly linear: input comes in, transformations run, and a value is returned.

### Side effects
No major external side effects; this file mostly shapes data or UI.

### TypeScript types and contracts
- L3: Type alias encodes domain vocabulary.
- L5: Generic type parameter constrains data shape.

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
