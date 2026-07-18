# Guide: src/lib/utils/crypto.ts

## Purpose
This file contains shared utility logic used by multiple layers (API, engine, queue, and worker).

## Line-by-line walkthrough

### Imports (what and why)
- L1: `import crypto from "crypto";` imports from `crypto` so this module can use that dependency.

### Functions and components
- L3: **sha256** (exported function) - signature: `export function sha256(value: string): string {`.
- L7: **hmacSha256** (exported function) - signature: `export function hmacSha256(payload: string, secret: string): string {`.
- L11: **randomSecret** (exported function) - signature: `export function randomSecret(bytes = 32): string {`.
- L15: **truncatePayload** (exported function) - signature: `export function truncatePayload(input: string, maxBytes = 1024): string {`.
- L19: **hashPassword** (exported async function) - signature: `export async function hashPassword(password: string): Promise<string> {`.
- L31: **verifyPassword** (exported async function) - signature: `export async function verifyPassword(password: string, hash: string): Promise<boolean> {`.

### Ordered walkthrough
- L1: `import crypto from "crypto";` - Imports a dependency so this module can use external functionality.
- L3: `export function sha256(value: string): string {` - Defines a function entrypoint that encapsulates one unit of behavior.
- L4: `return crypto.createHash("sha256").update(value).digest("hex");` - Interacts with the database; this is a persistent side effect.
- L5: `}` - Contributes to the local implementation details in this scope.
- L7: `export function hmacSha256(payload: string, secret: string): string {` - Defines a function entrypoint that encapsulates one unit of behavior.
- L8: `return crypto.createHmac("sha256", secret).update(payload).digest("hex");` - Interacts with the database; this is a persistent side effect.
- L9: `}` - Contributes to the local implementation details in this scope.
- L11: `export function randomSecret(bytes = 32): string {` - Defines a function entrypoint that encapsulates one unit of behavior.
- L12: `return crypto.randomBytes(bytes).toString("hex");` - Returns data/UI to the caller, ending the current function path.
- L13: `}` - Contributes to the local implementation details in this scope.
- L15: `export function truncatePayload(input: string, maxBytes = 1024): string {` - Defines a function entrypoint that encapsulates one unit of behavior.
- L16: `return Buffer.byteLength(input, "utf8") > maxBytes ? \`${input.slice(0, maxBytes)}...\` : input;` - Returns data/UI to the caller, ending the current function path.
- L17: `}` - Contributes to the local implementation details in this scope.
- L19: `export async function hashPassword(password: string): Promise<string> {` - Defines a function entrypoint that encapsulates one unit of behavior.
- L20: `return new Promise((resolve, reject) => {` - Returns data/UI to the caller, ending the current function path.
- L21: `crypto.scrypt(password, "flowpilot-salt", 64, (error, derivedKey) => {` - Contributes to the local implementation details in this scope.
- L22: `if (error) {` - Branches control flow so different code paths run under different conditions.
- L23: `reject(error);` - Contributes to the local implementation details in this scope.
- L24: `return;` - Contributes to the local implementation details in this scope.
- L25: `}` - Contributes to the local implementation details in this scope.
- L26: `resolve(derivedKey.toString("hex"));` - Contributes to the local implementation details in this scope.
- L27: `});` - Contributes to the local implementation details in this scope.
- L28: `});` - Contributes to the local implementation details in this scope.
- L29: `}` - Contributes to the local implementation details in this scope.
- L31: `export async function verifyPassword(password: string, hash: string): Promise<boolean> {` - Defines a function entrypoint that encapsulates one unit of behavior.
- L32: `const nextHash = await hashPassword(password);` - Declares a constant used to hold configuration, state, or helper logic in this scope.
- L33: `const expected = Buffer.from(hash, "hex");` - Declares a constant used to hold configuration, state, or helper logic in this scope.
- L34: `const actual = Buffer.from(nextHash, "hex");` - Declares a constant used to hold configuration, state, or helper logic in this scope.
- L36: `if (expected.length !== actual.length) {` - Branches control flow so different code paths run under different conditions.
- L37: `return false;` - Returns data/UI to the caller, ending the current function path.
- L38: `}` - Contributes to the local implementation details in this scope.
- L40: `return crypto.timingSafeEqual(expected, actual);` - Returns data/UI to the caller, ending the current function path.
- L41: `}` - Contributes to the local implementation details in this scope.

### State management
This file is mostly stateless. Most values are local constants or function parameters.

### Scope and closures
- L32: Module/function-scoped constant provides stable reference.
- L33: Module/function-scoped constant provides stable reference.
- L34: Module/function-scoped constant provides stable reference.

### Control flow
- L22: Conditional branch chooses behavior based on runtime input.
- L36: Conditional branch chooses behavior based on runtime input.

### Side effects
No major external side effects; this file mostly shapes data or UI.

### TypeScript types and contracts
- L19: Promise return type signals async contract.
- L31: Promise return type signals async contract.

## Concepts taught by this file
- webhook signature security
- async/await control flow

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
- async/await control flow: search for "JavaScript async await error handling"
