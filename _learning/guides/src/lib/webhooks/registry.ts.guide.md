# Guide: src/lib/webhooks/registry.ts

## Purpose
This file implements webhook infrastructure (signature/security/lookup) used for inbound and outbound webhook flows.

## Line-by-line walkthrough

### Imports (what and why)
- L1: `import { and, eq } from "drizzle-orm";` imports from `drizzle-orm` so this module can use that dependency.
- L2: `import { db } from "@/lib/db";` imports from `@/lib/db` so this module can use that dependency.
- L3: `import { webhookEndpoints } from "@/lib/db/schema";` imports from `@/lib/db/schema` so this module can use that dependency.

### Functions and components
- L5: **getWebhookEndpoint** (exported async function) - signature: `export async function getWebhookEndpoint(endpointId: string) {`.
- L11: **listTenantWebhookEndpoints** (exported async function) - signature: `export async function listTenantWebhookEndpoints(tenantId: string) {`.
- L18: **setWebhookLastTriggered** (exported async function) - signature: `export async function setWebhookLastTriggered(endpointId: string): Promise<void> {`.
- L25: **assertTenantEndpoint** (exported async function) - signature: `export async function assertTenantEndpoint(endpointId: string, tenantId: string) {`.

### Ordered walkthrough
- L1: `import { and, eq } from "drizzle-orm";` - Imports a dependency so this module can use external functionality.
- L2: `import { db } from "@/lib/db";` - Imports a dependency so this module can use external functionality.
- L3: `import { webhookEndpoints } from "@/lib/db/schema";` - Imports a dependency so this module can use external functionality.
- L5: `export async function getWebhookEndpoint(endpointId: string) {` - Defines a function entrypoint that encapsulates one unit of behavior.
- L6: `return db.query.webhookEndpoints.findFirst({` - Returns data/UI to the caller, ending the current function path.
- L7: `where: eq(webhookEndpoints.id, endpointId),` - Contributes to the local implementation details in this scope.
- L8: `});` - Contributes to the local implementation details in this scope.
- L9: `}` - Contributes to the local implementation details in this scope.
- L11: `export async function listTenantWebhookEndpoints(tenantId: string) {` - Defines a function entrypoint that encapsulates one unit of behavior.
- L12: `return db.query.webhookEndpoints.findMany({` - Returns data/UI to the caller, ending the current function path.
- L13: `where: eq(webhookEndpoints.tenantId, tenantId),` - Contributes to the local implementation details in this scope.
- L14: `orderBy: (table, { desc }) => [desc(table.createdAt)],` - Contributes to the local implementation details in this scope.
- L15: `});` - Contributes to the local implementation details in this scope.
- L16: `}` - Contributes to the local implementation details in this scope.
- L18: `export async function setWebhookLastTriggered(endpointId: string): Promise<void> {` - Defines a function entrypoint that encapsulates one unit of behavior.
- L19: `await db` - Contributes to the local implementation details in this scope.
- L20: `.update(webhookEndpoints)` - Interacts with the database; this is a persistent side effect.
- L21: `.set({ lastTriggered: new Date() })` - Contributes to the local implementation details in this scope.
- L22: `.where(eq(webhookEndpoints.id, endpointId));` - Contributes to the local implementation details in this scope.
- L23: `}` - Contributes to the local implementation details in this scope.
- L25: `export async function assertTenantEndpoint(endpointId: string, tenantId: string) {` - Defines a function entrypoint that encapsulates one unit of behavior.
- L26: `return db.query.webhookEndpoints.findFirst({` - Returns data/UI to the caller, ending the current function path.
- L27: `where: and(eq(webhookEndpoints.id, endpointId), eq(webhookEndpoints.tenantId, tenantId)),` - Contributes to the local implementation details in this scope.
- L28: `});` - Contributes to the local implementation details in this scope.
- L29: `}` - Contributes to the local implementation details in this scope.

### State management
- L18: `export async function setWebhookLastTriggered(endpointId: string): Promise<void> {` affects state ownership or updates.
- L21: `.set({ lastTriggered: new Date() })` affects state ownership or updates.

### Scope and closures
Scope is straightforward: module-level constants and function-local variables with no tricky closure behavior.

### Control flow
Control flow is mostly linear: input comes in, transformations run, and a value is returned.

### Side effects
- L6: Database IO side effect.
- L12: Database IO side effect.
- L26: Database IO side effect.

### TypeScript types and contracts
- L18: Promise return type signals async contract.

## Concepts taught by this file
- database modeling with ORM
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
- database modeling with ORM: search for "Drizzle ORM schema and relations"
- async/await control flow: search for "JavaScript async await error handling"
