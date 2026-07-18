# Guide: src/lib/queue/connection.ts

## Purpose
This file defines queue infrastructure that decouples request-time actions from background processing.

## Line-by-line walkthrough

### Imports (what and why)
- L1: `import { EventEmitter } from "events";` imports from `events` so this module can use that dependency.

### Functions and components
- L8: **cleanupExpired** (function) - signature: `function cleanupExpired(): void {`.
- L17: **InMemoryRedis** (exported class) - signature: `export class InMemoryRedis {`.

### Ordered walkthrough
- L1: `import { EventEmitter } from "events";` - Imports a dependency so this module can use external functionality.
- L3: `type RedisSetOption = "PX" | "NX";` - Defines a TypeScript type alias used to make data contracts explicit.
- L5: `const bus = new EventEmitter();` - Declares a constant used to hold configuration, state, or helper logic in this scope.
- L6: `const kv = new Map<string, { value: string; expiresAt?: number }>();` - Declares a constant used to hold configuration, state, or helper logic in this scope.
- L8: `function cleanupExpired(): void {` - Defines a function entrypoint that encapsulates one unit of behavior.
- L9: `const now = Date.now();` - Declares a constant used to hold configuration, state, or helper logic in this scope.
- L10: `for (const [key, value] of kv.entries()) {` - Iterates over data to apply repeated behavior.
- L11: `if (value.expiresAt && value.expiresAt <= now) {` - Branches control flow so different code paths run under different conditions.
- L12: `kv.delete(key);` - Interacts with the database; this is a persistent side effect.
- L13: `}` - Contributes to the local implementation details in this scope.
- L14: `}` - Contributes to the local implementation details in this scope.
- L15: `}` - Contributes to the local implementation details in this scope.
- L17: `export class InMemoryRedis {` - Defines a class that groups behavior and state under one abstraction.
- L18: `private readonly subscriptions = new Set<string>();` - Contributes to the local implementation details in this scope.
- L20: `async set(` - Contributes to the local implementation details in this scope.
- L21: `key: string,` - Contributes to the local implementation details in this scope.
- L22: `value: string,` - Contributes to the local implementation details in this scope.
- L23: `option1?: RedisSetOption,` - Contributes to the local implementation details in this scope.
- L24: `option2?: number | RedisSetOption,` - Contributes to the local implementation details in this scope.
- L25: `option3?: RedisSetOption,` - Contributes to the local implementation details in this scope.
- L26: `): Promise<"OK" | null> {` - Contributes to the local implementation details in this scope.
- L27: `cleanupExpired();` - Contributes to the local implementation details in this scope.
- L29: `const options = [option1, option2, option3];` - Declares a constant used to hold configuration, state, or helper logic in this scope.
- L30: `const nx = options.includes("NX");` - Declares a constant used to hold configuration, state, or helper logic in this scope.
- L31: `const px = options.includes("PX");` - Declares a constant used to hold configuration, state, or helper logic in this scope.
- L32: `const pxIndex = options.findIndex((item) => item === "PX");` - Declares a constant used to hold configuration, state, or helper logic in this scope.
- L33: `const ttlCandidate = pxIndex >= 0 ? options[pxIndex + 1] : undefined;` - Declares a constant used to hold configuration, state, or helper logic in this scope.
- L34: `const ttl = typeof ttlCandidate === "number" ? ttlCandidate : undefined;` - Declares a constant used to hold configuration, state, or helper logic in this scope.
- L36: `if (nx && kv.has(key)) {` - Branches control flow so different code paths run under different conditions.
- L37: `return null;` - Returns data/UI to the caller, ending the current function path.
- L38: `}` - Contributes to the local implementation details in this scope.
- L40: `kv.set(key, { value, expiresAt: px && ttl ? Date.now() + ttl : undefined });` - Contributes to the local implementation details in this scope.
- L41: `return "OK";` - Returns data/UI to the caller, ending the current function path.
- L42: `}` - Contributes to the local implementation details in this scope.
- L44: `async del(key: string): Promise<number> {` - Contributes to the local implementation details in this scope.
- L45: `cleanupExpired();` - Contributes to the local implementation details in this scope.
- L46: `return kv.delete(key) ? 1 : 0;` - Interacts with the database; this is a persistent side effect.
- L47: `}` - Contributes to the local implementation details in this scope.
- L49: `async publish(channel: string, payload: string): Promise<number> {` - Registers runtime side effects/events that must be cleaned up or coordinated.
- L50: `bus.emit(channel, payload);` - Contributes to the local implementation details in this scope.
- L51: `return 1;` - Returns data/UI to the caller, ending the current function path.
- L52: `}` - Contributes to the local implementation details in this scope.
- L54: `duplicate(): InMemoryRedis {` - Contributes to the local implementation details in this scope.
- L55: `return new InMemoryRedis();` - Returns data/UI to the caller, ending the current function path.
- L56: `}` - Contributes to the local implementation details in this scope.
- L58: `async connect(): Promise<void> {` - Contributes to the local implementation details in this scope.
- L59: `return;` - Contributes to the local implementation details in this scope.
- L60: `}` - Contributes to the local implementation details in this scope.
- L62: `async subscribe(channel: string): Promise<void> {` - Registers runtime side effects/events that must be cleaned up or coordinated.
- L63: `this.subscriptions.add(channel);` - Contributes to the local implementation details in this scope.
- L64: `}` - Contributes to the local implementation details in this scope.
- L66: `async unsubscribe(channel: string): Promise<void> {` - Registers runtime side effects/events that must be cleaned up or coordinated.
- L67: `this.subscriptions.delete(channel);` - Interacts with the database; this is a persistent side effect.
- L68: `}` - Contributes to the local implementation details in this scope.
- L70: `on(event: "message", listener: (channel: string, payload: string) => void): this {` - Contributes to the local implementation details in this scope.
- L71: `if (event === "message") {` - Branches control flow so different code paths run under different conditions.
- L72: `for (const channel of this.subscriptions) {` - Iterates over data to apply repeated behavior.
- L73: `bus.on(channel, (payload: string) => listener(channel, payload));` - Contributes to the local implementation details in this scope.
- L74: `}` - Contributes to the local implementation details in this scope.
- L75: `}` - Contributes to the local implementation details in this scope.
- L76: `return this;` - Returns data/UI to the caller, ending the current function path.
- L77: `}` - Contributes to the local implementation details in this scope.
- L79: `off(event: "message", listener: (channel: string, payload: string) => void): this {` - Contributes to the local implementation details in this scope.
- L80: `if (event === "message") {` - Branches control flow so different code paths run under different conditions.
- L81: `for (const channel of this.subscriptions) {` - Iterates over data to apply repeated behavior.
- L82: `bus.off(channel, (payload: string) => listener(channel, payload));` - Contributes to the local implementation details in this scope.
- L83: `}` - Contributes to the local implementation details in this scope.
- L84: `}` - Contributes to the local implementation details in this scope.
- L85: `return this;` - Returns data/UI to the caller, ending the current function path.
- L86: `}` - Contributes to the local implementation details in this scope.
- L88: `async quit(): Promise<void> {` - Contributes to the local implementation details in this scope.
- L89: `return;` - Contributes to the local implementation details in this scope.
- L90: `}` - Contributes to the local implementation details in this scope.
- L91: `}` - Contributes to the local implementation details in this scope.
- L93: `export const redis = new InMemoryRedis();` - Declares a constant used to hold configuration, state, or helper logic in this scope.
- L94: `export const redisSubscriber = new InMemoryRedis();` - Declares a constant used to hold configuration, state, or helper logic in this scope.

### State management
- L20: `async set(` affects state ownership or updates.
- L40: `kv.set(key, { value, expiresAt: px && ttl ? Date.now() + ttl : undefined });` affects state ownership or updates.

### Scope and closures
- L5: Module/function-scoped constant provides stable reference.
- L6: Module/function-scoped constant provides stable reference.
- L9: Module/function-scoped constant provides stable reference.
- L29: Module/function-scoped constant provides stable reference.
- L30: Module/function-scoped constant provides stable reference.
- L31: Module/function-scoped constant provides stable reference.
- L33: Module/function-scoped constant provides stable reference.
- L34: Module/function-scoped constant provides stable reference.

### Control flow
- L10: Loop processes repeated data/work.
- L11: Conditional branch chooses behavior based on runtime input.
- L36: Conditional branch chooses behavior based on runtime input.
- L71: Conditional branch chooses behavior based on runtime input.
- L72: Loop processes repeated data/work.
- L80: Conditional branch chooses behavior based on runtime input.
- L81: Loop processes repeated data/work.

### Side effects
- L49: Messaging side effect.
- L62: Messaging side effect.
- L66: Messaging side effect.

### TypeScript types and contracts
- L3: Type alias encodes domain vocabulary.
- L6: Generic type parameter constrains data shape.
- L26: Promise return type signals async contract.
- L44: Promise return type signals async contract.
- L49: Promise return type signals async contract.
- L58: Promise return type signals async contract.
- L62: Promise return type signals async contract.
- L66: Promise return type signals async contract.
- L88: Promise return type signals async contract.

## Concepts taught by this file
- background job processing
- TypeScript type contracts
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
- background job processing: search for "background workers and job queues Node.js"
- TypeScript type contracts: search for "TypeScript interfaces vs types"
- async/await control flow: search for "JavaScript async await error handling"
