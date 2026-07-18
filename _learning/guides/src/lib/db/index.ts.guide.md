# Guide: src/lib/db/index.ts

## Purpose
This file initializes the database client and connection pool used across server modules.

## Line-by-line walkthrough

### Imports (what and why)
- L1: `import { drizzle } from "drizzle-orm/node-postgres";` imports from `drizzle-orm/node-postgres` so this module can use that dependency.
- L2: `import { Pool } from "pg";` imports from `pg` so this module can use that dependency.
- L3: `import * as schema from "@/lib/db/schema";` imports from `@/lib/db/schema` so this module can use that dependency.

### Functions and components
- No named function/class declarations were detected; behavior may be configuration/data declarations.

### Ordered walkthrough
- L1: `import { drizzle } from "drizzle-orm/node-postgres";` - Imports a dependency so this module can use external functionality.
- L2: `import { Pool } from "pg";` - Imports a dependency so this module can use external functionality.
- L3: `import * as schema from "@/lib/db/schema";` - Imports a dependency so this module can use external functionality.
- L5: `const connectionString = process.env.DATABASE_URL;` - Declares a constant used to hold configuration, state, or helper logic in this scope.
- L6: `const fallbackConnectionString = "postgresql://flowpilot:flowpilot_dev@localhost:5432/flowpilot";` - Declares a constant used to hold configuration, state, or helper logic in this scope.
- L8: `export const pool = new Pool({` - Declares a constant used to hold configuration, state, or helper logic in this scope.
- L9: `connectionString: connectionString ?? fallbackConnectionString,` - Contributes to the local implementation details in this scope.
- L10: `max: 20,` - Contributes to the local implementation details in this scope.
- L11: `});` - Contributes to the local implementation details in this scope.
- L13: `export const db = drizzle(pool, { schema });` - Declares a constant used to hold configuration, state, or helper logic in this scope.

### State management
This file is mostly stateless. Most values are local constants or function parameters.

### Scope and closures
- L5: Module/function-scoped constant provides stable reference.
- L6: Module/function-scoped constant provides stable reference.

### Control flow
Control flow is mostly linear: input comes in, transformations run, and a value is returned.

### Side effects
No major external side effects; this file mostly shapes data or UI.

### TypeScript types and contracts
Type usage is light here; contracts are mostly inferred from function signatures and library types.

## Concepts taught by this file
- database modeling with ORM

## Common mistakes
- Changing schema names without updating all route/query usage.
- Missing indexes for query patterns used by APIs.
- Putting business logic directly inside seed scripts.

## Mini exercises
- Rename one variable to improve clarity, then explain why readability improved.
- Add one guard for invalid input and document expected behavior.
- Trace one value from input to output in this file and write the path as comments.

## Further reading
- database modeling with ORM: search for "Drizzle ORM schema and relations"
