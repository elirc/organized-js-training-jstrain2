# Guide: src/app/api/events/stream/route.ts

## Purpose
This file defines a server API route. It handles HTTP requests, validates and transforms input, coordinates database/service calls, and returns a standardized response envelope.

## Line-by-line walkthrough

### Imports (what and why)
- L1: `import { NextRequest } from "next/server";` imports from `next/server` so this module can use that dependency.
- L2: `import { redisSubscriber } from "@/lib/queue/connection";` imports from `@/lib/queue/connection` so this module can use that dependency.

### Functions and components
- L6: **GET** (exported async function) - signature: `export async function GET(request: NextRequest) {`.
- L19: **onMessage** (arrow function) - signature: `const onMessage = (_channel: string, payload: string) => {`.

### Ordered walkthrough
- L1: `import { NextRequest } from "next/server";` - Imports a dependency so this module can use external functionality.
- L2: `import { redisSubscriber } from "@/lib/queue/connection";` - Imports a dependency so this module can use external functionality.
- L4: `export const dynamic = "force-dynamic";` - Declares a constant used to hold configuration, state, or helper logic in this scope.
- L6: `export async function GET(request: NextRequest) {` - Defines a function entrypoint that encapsulates one unit of behavior.
- L7: `const runId = request.nextUrl.searchParams.get("runId");` - Declares a constant used to hold configuration, state, or helper logic in this scope.
- L8: `const workflowId = request.nextUrl.searchParams.get("workflowId");` - Declares a constant used to hold configuration, state, or helper logic in this scope.
- L9: `const channel = runId ? \`flowpilot:runs:${runId}\` : workflowId ? \`flowpilot:workflows:${workflowId}\` : "flowpilot:broadcast";` - Declares a constant used to hold configuration, state, or helper logic in this scope.
- L11: `const encoder = new TextEncoder();` - Declares a constant used to hold configuration, state, or helper logic in this scope.
- L13: `const stream = new ReadableStream({` - Declares a constant used to hold configuration, state, or helper logic in this scope.
- L14: `async start(controller) {` - Contributes to the local implementation details in this scope.
- L15: `const subscriber = redisSubscriber.duplicate();` - Declares a constant used to hold configuration, state, or helper logic in this scope.
- L16: `await subscriber.connect();` - Contributes to the local implementation details in this scope.
- L17: `await subscriber.subscribe(channel);` - Registers runtime side effects/events that must be cleaned up or coordinated.
- L19: `const onMessage = (_channel: string, payload: string) => {` - Declares a constant used to hold configuration, state, or helper logic in this scope.
- L20: `controller.enqueue(encoder.encode(\`data: ${payload}\n\n\`));` - Contributes to the local implementation details in this scope.
- L21: `};` - Contributes to the local implementation details in this scope.
- L23: `subscriber.on("message", onMessage);` - Contributes to the local implementation details in this scope.
- L25: `controller.enqueue(encoder.encode(\`data: ${JSON.stringify({ event: "connected" })}\n\n\`));` - Contributes to the local implementation details in this scope.
- L27: `const heartbeat = setInterval(() => {` - Declares a constant used to hold configuration, state, or helper logic in this scope.
- L28: `controller.enqueue(encoder.encode(\`event: ping\ndata: ${Date.now()}\n\n\`));` - Contributes to the local implementation details in this scope.
- L29: `}, 15000);` - Contributes to the local implementation details in this scope.
- L31: `request.signal.addEventListener("abort", async () => {` - Registers runtime side effects/events that must be cleaned up or coordinated.
- L32: `clearInterval(heartbeat);` - Contributes to the local implementation details in this scope.
- L33: `subscriber.off("message", onMessage);` - Contributes to the local implementation details in this scope.
- L34: `await subscriber.unsubscribe(channel);` - Registers runtime side effects/events that must be cleaned up or coordinated.
- L35: `await subscriber.quit();` - Contributes to the local implementation details in this scope.
- L36: `controller.close();` - Contributes to the local implementation details in this scope.
- L37: `});` - Contributes to the local implementation details in this scope.
- L38: `},` - Contributes to the local implementation details in this scope.
- L39: `});` - Contributes to the local implementation details in this scope.
- L41: `return new Response(stream, {` - Builds an HTTP response object returned to the client.
- L42: `headers: {` - Contributes to the local implementation details in this scope.
- L43: `"Content-Type": "text/event-stream",` - Contributes to the local implementation details in this scope.
- L44: `"Cache-Control": "no-cache, no-transform",` - Contributes to the local implementation details in this scope.
- L45: `Connection: "keep-alive",` - Contributes to the local implementation details in this scope.
- L46: `},` - Contributes to the local implementation details in this scope.
- L47: `});` - Contributes to the local implementation details in this scope.
- L48: `}` - Contributes to the local implementation details in this scope.

### State management
- L27: `const heartbeat = setInterval(() => {` affects state ownership or updates.

### Scope and closures
- L7: Module/function-scoped constant provides stable reference.
- L8: Module/function-scoped constant provides stable reference.
- L9: Module/function-scoped constant provides stable reference.
- L11: Module/function-scoped constant provides stable reference.
- L13: Module/function-scoped constant provides stable reference.
- L15: Module/function-scoped constant provides stable reference.
- L27: Callback closure captures variables from outer scope.

### Control flow
Control flow is mostly linear: input comes in, transformations run, and a value is returned.

### Side effects
- L17: Messaging side effect.
- L27: Timer/event listener side effect.
- L31: Timer/event listener side effect.
- L34: Messaging side effect.

### TypeScript types and contracts
Type usage is light here; contracts are mostly inferred from function signatures and library types.

## Concepts taught by this file
- api route handler
- side effects and lifecycle
- background job processing
- SSE realtime streaming
- async/await control flow

## Common mistakes
- Forgetting tenant/auth checks before querying data.
- Returning raw errors instead of normalized `{ success, error }` envelopes.
- Not validating request bodies, causing runtime failures deeper in the stack.

## Mini exercises
- Add one new validation rule to the request body and return a clear error code when it fails.
- Add cursor/limit support (or tighten it) and explain how it prevents heavy responses.
- Write a unit test that proves one unhappy path is handled correctly.

## Further reading
- api route handler: search for "Next.js Route Handlers tutorial"
- side effects and lifecycle: search for "React useEffect cleanup patterns"
- background job processing: search for "background workers and job queues Node.js"
- SSE realtime streaming: search for "Server-Sent Events with Next.js"
- async/await control flow: search for "JavaScript async await error handling"
