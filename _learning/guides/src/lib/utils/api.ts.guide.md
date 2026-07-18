# Guide: src/lib/utils/api.ts

## Purpose
This file contains shared utility logic used by multiple layers (API, engine, queue, and worker).

## Line-by-line walkthrough

### Imports (what and why)
- L1: `import { NextResponse } from "next/server";` imports from `next/server` so this module can use that dependency.
- L2: `import { FlowPilotError } from "@/lib/utils/errors";` imports from `@/lib/utils/errors` so this module can use that dependency.

### Functions and components
- L17: **ok** (exported function) - signature: `export function ok<T>(data: T, status = 200): NextResponse<ApiSuccess<T>> {`.
- L21: **fail** (exported function) - signature: `export function fail(code: string, message: string, status = 400): NextResponse<ApiFailure> {`.
- L25: **fromError** (exported function) - signature: `export function fromError(error: unknown): NextResponse<ApiFailure> {`.

### Ordered walkthrough
- L1: `import { NextResponse } from "next/server";` - Imports a dependency so this module can use external functionality.
- L2: `import { FlowPilotError } from "@/lib/utils/errors";` - Imports a dependency so this module can use external functionality.
- L4: `export interface ApiSuccess<T> {` - Defines a TypeScript interface contract that constrains object shape at compile time.
- L5: `success: true;` - Contributes to the local implementation details in this scope.
- L6: `data: T;` - Contributes to the local implementation details in this scope.
- L7: `}` - Contributes to the local implementation details in this scope.
- L9: `export interface ApiFailure {` - Defines a TypeScript interface contract that constrains object shape at compile time.
- L10: `success: false;` - Contributes to the local implementation details in this scope.
- L11: `error: {` - Contributes to the local implementation details in this scope.
- L12: `code: string;` - Contributes to the local implementation details in this scope.
- L13: `message: string;` - Contributes to the local implementation details in this scope.
- L14: `};` - Contributes to the local implementation details in this scope.
- L15: `}` - Contributes to the local implementation details in this scope.
- L17: `export function ok<T>(data: T, status = 200): NextResponse<ApiSuccess<T>> {` - Defines a function entrypoint that encapsulates one unit of behavior.
- L18: `return NextResponse.json({ success: true, data }, { status });` - Builds an HTTP response object returned to the client.
- L19: `}` - Contributes to the local implementation details in this scope.
- L21: `export function fail(code: string, message: string, status = 400): NextResponse<ApiFailure> {` - Defines a function entrypoint that encapsulates one unit of behavior.
- L22: `return NextResponse.json({ success: false, error: { code, message } }, { status });` - Builds an HTTP response object returned to the client.
- L23: `}` - Contributes to the local implementation details in this scope.
- L25: `export function fromError(error: unknown): NextResponse<ApiFailure> {` - Defines a function entrypoint that encapsulates one unit of behavior.
- L26: `if (error instanceof FlowPilotError) {` - Branches control flow so different code paths run under different conditions.
- L27: `return fail(error.code, error.message, 400);` - Builds an HTTP response object returned to the client.
- L28: `}` - Contributes to the local implementation details in this scope.
- L29: `if (error instanceof Error) {` - Branches control flow so different code paths run under different conditions.
- L30: `return fail("INTERNAL_ERROR", error.message, 500);` - Builds an HTTP response object returned to the client.
- L31: `}` - Contributes to the local implementation details in this scope.
- L32: `return fail("INTERNAL_ERROR", "Unknown error", 500);` - Builds an HTTP response object returned to the client.
- L33: `}` - Contributes to the local implementation details in this scope.

### State management
This file is mostly stateless. Most values are local constants or function parameters.

### Scope and closures
Scope is straightforward: module-level constants and function-local variables with no tricky closure behavior.

### Control flow
- L26: Conditional branch chooses behavior based on runtime input.
- L29: Conditional branch chooses behavior based on runtime input.

### Side effects
No major external side effects; this file mostly shapes data or UI.

### TypeScript types and contracts
- L4: Interface defines structural contract.
- L9: Interface defines structural contract.

## Concepts taught by this file
- error handling strategy
- TypeScript type contracts

## Common mistakes
- Changing this file without updating dependent modules.
- Ignoring edge-case error paths.
- Skipping tests/docs for behavior changes.

## Mini exercises
- Rename one variable to improve clarity, then explain why readability improved.
- Add one guard for invalid input and document expected behavior.
- Trace one value from input to output in this file and write the path as comments.

## Further reading
- error handling strategy: search for "error handling best practices TypeScript backend"
- TypeScript type contracts: search for "TypeScript interfaces vs types"
