# Guide: src/hooks/useRunStream.ts

## Purpose
This file defines a custom React hook that encapsulates reusable stateful behavior.

## Line-by-line walkthrough

### Imports (what and why)
- L3: `import { useEffect, useState } from "react";` imports from `react` so this module can use that dependency.

### Functions and components
- L11: **useRunStream** (exported function) - signature: `export function useRunStream(runId: string) {`.

### Ordered walkthrough
- L1: `"use client";` - Contributes to the local implementation details in this scope.
- L3: `import { useEffect, useState } from "react";` - Imports a dependency so this module can use external functionality.
- L5: `interface RunEvent {` - Defines a TypeScript interface contract that constrains object shape at compile time.
- L6: `event: string;` - Contributes to the local implementation details in this scope.
- L7: `status?: string;` - Contributes to the local implementation details in this scope.
- L8: `[key: string]: unknown;` - Contributes to the local implementation details in this scope.
- L9: `}` - Contributes to the local implementation details in this scope.
- L11: `export function useRunStream(runId: string) {` - Defines a function entrypoint that encapsulates one unit of behavior.
- L12: `const [events, setEvents] = useState<RunEvent[]>([]);` - Declares a constant used to hold configuration, state, or helper logic in this scope.
- L13: `const [isConnected, setIsConnected] = useState(false);` - Declares a constant used to hold configuration, state, or helper logic in this scope.
- L15: `useEffect(() => {` - Starts a side effect tied to component lifecycle/dependency changes.
- L16: `const source = new EventSource(\`/api/events/stream?runId=${encodeURIComponent(runId)}\`);` - Declares a constant used to hold configuration, state, or helper logic in this scope.
- L18: `source.onopen = () => {` - Contributes to the local implementation details in this scope.
- L19: `setIsConnected(true);` - Contributes to the local implementation details in this scope.
- L20: `};` - Contributes to the local implementation details in this scope.
- L22: `source.onmessage = (message) => {` - Contributes to the local implementation details in this scope.
- L23: `try {` - Starts guarded execution for operations that may throw.
- L24: `const parsed = JSON.parse(message.data) as RunEvent;` - Declares a constant used to hold configuration, state, or helper logic in this scope.
- L25: `setEvents((prev) => [...prev, parsed]);` - Contributes to the local implementation details in this scope.
- L26: `} catch {` - Contributes to the local implementation details in this scope.
- L27: `// no-op` - Comment describing intent or constraints for future maintainers.
- L28: `}` - Contributes to the local implementation details in this scope.
- L29: `};` - Contributes to the local implementation details in this scope.
- L31: `source.onerror = () => {` - Contributes to the local implementation details in this scope.
- L32: `setIsConnected(false);` - Contributes to the local implementation details in this scope.
- L33: `};` - Contributes to the local implementation details in this scope.
- L35: `return () => {` - Returns data/UI to the caller, ending the current function path.
- L36: `source.close();` - Contributes to the local implementation details in this scope.
- L37: `setIsConnected(false);` - Contributes to the local implementation details in this scope.
- L38: `};` - Contributes to the local implementation details in this scope.
- L39: `}, [runId]);` - Contributes to the local implementation details in this scope.
- L41: `return { events, isConnected };` - Returns data/UI to the caller, ending the current function path.
- L42: `}` - Contributes to the local implementation details in this scope.

### State management
- L12: `const [events, setEvents] = useState<RunEvent[]>([]);` affects state ownership or updates.
- L13: `const [isConnected, setIsConnected] = useState(false);` affects state ownership or updates.
- L19: `setIsConnected(true);` affects state ownership or updates.
- L25: `setEvents((prev) => [...prev, parsed]);` affects state ownership or updates.
- L32: `setIsConnected(false);` affects state ownership or updates.
- L37: `setIsConnected(false);` affects state ownership or updates.

### Scope and closures
- L12: Module/function-scoped constant provides stable reference.
- L13: Module/function-scoped constant provides stable reference.
- L16: Module/function-scoped constant provides stable reference.
- L24: Module/function-scoped constant provides stable reference.

### Control flow
- L23: Protected block for expected fallible operations.

### Side effects
No major external side effects; this file mostly shapes data or UI.

### TypeScript types and contracts
- L5: Interface defines structural contract.

## Concepts taught by this file
- state management (useState/useStore)
- side effects and lifecycle
- SSE realtime streaming
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
- state management (useState/useStore): search for "React useState and Zustand basics"
- side effects and lifecycle: search for "React useEffect cleanup patterns"
- SSE realtime streaming: search for "Server-Sent Events with Next.js"
- TypeScript type contracts: search for "TypeScript interfaces vs types"
