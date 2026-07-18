# Guide: src/lib/webhooks/signature.ts

## Purpose
This file implements webhook infrastructure (signature/security/lookup) used for inbound and outbound webhook flows.

## Line-by-line walkthrough

### Imports (what and why)
- L1: `import crypto from "crypto";` imports from `crypto` so this module can use that dependency.
- L2: `import { hmacSha256 } from "@/lib/utils/crypto";` imports from `@/lib/utils/crypto` so this module can use that dependency.

### Functions and components
- L4: **signPayload** (exported function) - signature: `export function signPayload(payload: string, secret: string): string {`.
- L8: **verifySignature** (exported function) - signature: `export function verifySignature(payload: string, signature: string, secret: string): boolean {`.

### Ordered walkthrough
- L1: `import crypto from "crypto";` - Imports a dependency so this module can use external functionality.
- L2: `import { hmacSha256 } from "@/lib/utils/crypto";` - Imports a dependency so this module can use external functionality.
- L4: `export function signPayload(payload: string, secret: string): string {` - Defines a function entrypoint that encapsulates one unit of behavior.
- L5: `return hmacSha256(payload, secret);` - Returns data/UI to the caller, ending the current function path.
- L6: `}` - Contributes to the local implementation details in this scope.
- L8: `export function verifySignature(payload: string, signature: string, secret: string): boolean {` - Defines a function entrypoint that encapsulates one unit of behavior.
- L9: `const expected = signPayload(payload, secret);` - Declares a constant used to hold configuration, state, or helper logic in this scope.
- L10: `const expectedBuffer = Buffer.from(expected, "utf8");` - Declares a constant used to hold configuration, state, or helper logic in this scope.
- L11: `const receivedBuffer = Buffer.from(signature, "utf8");` - Declares a constant used to hold configuration, state, or helper logic in this scope.
- L13: `if (expectedBuffer.length !== receivedBuffer.length) {` - Branches control flow so different code paths run under different conditions.
- L14: `return false;` - Returns data/UI to the caller, ending the current function path.
- L15: `}` - Contributes to the local implementation details in this scope.
- L17: `return crypto.timingSafeEqual(expectedBuffer, receivedBuffer);` - Returns data/UI to the caller, ending the current function path.
- L18: `}` - Contributes to the local implementation details in this scope.

### State management
This file is mostly stateless. Most values are local constants or function parameters.

### Scope and closures
- L9: Module/function-scoped constant provides stable reference.
- L10: Module/function-scoped constant provides stable reference.
- L11: Module/function-scoped constant provides stable reference.

### Control flow
- L13: Conditional branch chooses behavior based on runtime input.

### Side effects
No major external side effects; this file mostly shapes data or UI.

### TypeScript types and contracts
Type usage is light here; contracts are mostly inferred from function signatures and library types.

## Concepts taught by this file
- webhook signature security

## Common mistakes
- Changing this file without updating dependent modules.
- Ignoring edge-case error paths.
- Skipping tests/docs for behavior changes.

## Mini exercises
- Rename one variable to improve clarity, then explain why readability improved.
- Add one guard for invalid input and document expected behavior.
- Trace one value from input to output in this file and write the path as comments.

## Further reading
- webhook signature security: search for "HMAC webhook signature verification"
