# Guide: src/lib/auth/tenant.ts

## Purpose
This file contains authentication/authorization helpers used by API routes to enforce user and tenant access rules.

## Line-by-line walkthrough

### Imports (what and why)
- L1: `import { eq } from "drizzle-orm";` imports from `drizzle-orm` so this module can use that dependency.
- L2: `import { auth } from "@/auth";` imports from `@/auth` so this module can use that dependency.
- L3: `import { db } from "@/lib/db";` imports from `@/lib/db` so this module can use that dependency.
- L4: `import { tenantMembers } from "@/lib/db/schema";` imports from `@/lib/db/schema` so this module can use that dependency.
- L5: `import { FlowPilotError } from "@/lib/utils/errors";` imports from `@/lib/utils/errors` so this module can use that dependency.

### Functions and components
- L12: **requireTenantContext** (exported async function) - signature: `export async function requireTenantContext(): Promise<TenantContext> {`.

### Ordered walkthrough
- L1: `import { eq } from "drizzle-orm";` - Imports a dependency so this module can use external functionality.
- L2: `import { auth } from "@/auth";` - Imports a dependency so this module can use external functionality.
- L3: `import { db } from "@/lib/db";` - Imports a dependency so this module can use external functionality.
- L4: `import { tenantMembers } from "@/lib/db/schema";` - Imports a dependency so this module can use external functionality.
- L5: `import { FlowPilotError } from "@/lib/utils/errors";` - Imports a dependency so this module can use external functionality.
- L7: `export interface TenantContext {` - Defines a TypeScript interface contract that constrains object shape at compile time.
- L8: `userId: string;` - Contributes to the local implementation details in this scope.
- L9: `tenantId: string;` - Contributes to the local implementation details in this scope.
- L10: `}` - Contributes to the local implementation details in this scope.
- L12: `export async function requireTenantContext(): Promise<TenantContext> {` - Defines a function entrypoint that encapsulates one unit of behavior.
- L13: `const session = await auth();` - Declares a constant used to hold configuration, state, or helper logic in this scope.
- L14: `const userId = session?.user?.id;` - Declares a constant used to hold configuration, state, or helper logic in this scope.
- L16: `if (!userId) {` - Branches control flow so different code paths run under different conditions.
- L17: `throw new FlowPilotError("Unauthorized", "UNAUTHORIZED");` - Raises an error intentionally so callers can react to failure.
- L18: `}` - Contributes to the local implementation details in this scope.
- L20: `const member = await db.query.tenantMembers.findFirst({` - Declares a constant used to hold configuration, state, or helper logic in this scope.
- L21: `where: eq(tenantMembers.userId, userId),` - Contributes to the local implementation details in this scope.
- L22: `});` - Contributes to the local implementation details in this scope.
- L24: `if (!member) {` - Branches control flow so different code paths run under different conditions.
- L25: `throw new FlowPilotError("Tenant membership not found", "TENANT_NOT_FOUND");` - Raises an error intentionally so callers can react to failure.
- L26: `}` - Contributes to the local implementation details in this scope.
- L28: `return {` - Returns data/UI to the caller, ending the current function path.
- L29: `userId,` - Contributes to the local implementation details in this scope.
- L30: `tenantId: member.tenantId,` - Contributes to the local implementation details in this scope.
- L31: `};` - Contributes to the local implementation details in this scope.
- L32: `}` - Contributes to the local implementation details in this scope.

### State management
This file is mostly stateless. Most values are local constants or function parameters.

### Scope and closures
- L13: Module/function-scoped constant provides stable reference.
- L14: Module/function-scoped constant provides stable reference.
- L20: Module/function-scoped constant provides stable reference.

### Control flow
- L16: Conditional branch chooses behavior based on runtime input.
- L24: Conditional branch chooses behavior based on runtime input.

### Side effects
- L20: Database IO side effect.

### TypeScript types and contracts
- L7: Interface defines structural contract.
- L12: Promise return type signals async contract.

## Concepts taught by this file
- database modeling with ORM
- error handling strategy
- authentication and session callbacks
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
- database modeling with ORM: search for "Drizzle ORM schema and relations"
- error handling strategy: search for "error handling best practices TypeScript backend"
- authentication and session callbacks: search for "NextAuth credentials provider callbacks"
- TypeScript type contracts: search for "TypeScript interfaces vs types"
- async/await control flow: search for "JavaScript async await error handling"
