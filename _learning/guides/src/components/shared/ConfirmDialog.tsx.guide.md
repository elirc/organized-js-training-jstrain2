# Guide: src/components/shared/ConfirmDialog.tsx

## Purpose
This file defines a reusable UI component. It packages rendering logic and behavior behind a focused interface.

## Line-by-line walkthrough

### Imports (what and why)
- This file has no explicit imports (or uses runtime globals).

### Functions and components
- L3: **ConfirmDialog** (exported function) - signature: `export function ConfirmDialog({`.

### Ordered walkthrough
- L1: `"use client";` - Contributes to the local implementation details in this scope.
- L3: `export function ConfirmDialog({` - Defines a function entrypoint that encapsulates one unit of behavior.
- L4: `open,` - Contributes to the local implementation details in this scope.
- L5: `title,` - Contributes to the local implementation details in this scope.
- L6: `onConfirm,` - Contributes to the local implementation details in this scope.
- L7: `onCancel,` - Contributes to the local implementation details in this scope.
- L8: `}: {` - Contributes to the local implementation details in this scope.
- L9: `open: boolean;` - Contributes to the local implementation details in this scope.
- L10: `title: string;` - Contributes to the local implementation details in this scope.
- L11: `onConfirm: () => void;` - Contributes to the local implementation details in this scope.
- L12: `onCancel: () => void;` - Contributes to the local implementation details in this scope.
- L13: `}) {` - Contributes to the local implementation details in this scope.
- L14: `if (!open) {` - Branches control flow so different code paths run under different conditions.
- L15: `return null;` - Returns data/UI to the caller, ending the current function path.
- L16: `}` - Contributes to the local implementation details in this scope.
- L18: `return (` - Returns data/UI to the caller, ending the current function path.
- L19: `<div className="fixed inset-0 z-50 grid place-items-center bg-slate-900/30 p-4">` - Declares JSX UI structure rendered by this React component.
- L20: `<div className="w-full max-w-sm rounded-xl bg-white p-4 shadow-lg">` - Declares JSX UI structure rendered by this React component.
- L21: `<h3 className="text-sm font-semibold">{title}</h3>` - Declares JSX UI structure rendered by this React component.
- L22: `<div className="mt-4 flex justify-end gap-2">` - Declares JSX UI structure rendered by this React component.
- L23: `<button type="button" onClick={onCancel} className="rounded-md border border-slate-300 px-3 py-1 text-sm">` - Declares JSX UI structure rendered by this React component.
- L24: `Cancel` - Contributes to the local implementation details in this scope.
- L25: `</button>` - Declares JSX UI structure rendered by this React component.
- L26: `<button type="button" onClick={onConfirm} className="rounded-md bg-brand-500 px-3 py-1 text-sm text-white">` - Declares JSX UI structure rendered by this React component.
- L27: `Confirm` - Contributes to the local implementation details in this scope.
- L28: `</button>` - Declares JSX UI structure rendered by this React component.
- L29: `</div>` - Declares JSX UI structure rendered by this React component.
- L30: `</div>` - Declares JSX UI structure rendered by this React component.
- L31: `</div>` - Declares JSX UI structure rendered by this React component.
- L32: `);` - Contributes to the local implementation details in this scope.
- L33: `}` - Contributes to the local implementation details in this scope.

### State management
- L19: `<div className="fixed inset-0 z-50 grid place-items-center bg-slate-900/30 p-4">` affects state ownership or updates.

### Scope and closures
Scope is straightforward: module-level constants and function-local variables with no tricky closure behavior.

### Control flow
- L14: Conditional branch chooses behavior based on runtime input.

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
