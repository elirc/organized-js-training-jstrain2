# Guide: package.json

## Purpose
This file defines project dependencies and executable scripts, acting as the command surface for common workflows.

## Line-by-line walkthrough

### Imports (what and why)
- This file has no explicit imports (or uses runtime globals).

### Functions and components
- No named function/class declarations were detected; behavior may be configuration/data declarations.

### Ordered walkthrough
- L1: `{` - Contributes to the local implementation details in this scope.
- L2: `"name": "flowpilot",` - Contributes to the local implementation details in this scope.
- L3: `"version": "0.1.0",` - Contributes to the local implementation details in this scope.
- L4: `"private": true,` - Contributes to the local implementation details in this scope.
- L5: `"scripts": {` - Contributes to the local implementation details in this scope.
- L6: `"dev": "next dev",` - Contributes to the local implementation details in this scope.
- L7: `"build": "next build",` - Contributes to the local implementation details in this scope.
- L8: `"start": "next start",` - Contributes to the local implementation details in this scope.
- L9: `"lint": "next lint",` - Contributes to the local implementation details in this scope.
- L10: `"typecheck": "tsc --noEmit",` - Contributes to the local implementation details in this scope.
- L11: `"worker": "tsx worker/index.ts",` - Contributes to the local implementation details in this scope.
- L12: `"db:generate": "drizzle-kit generate",` - Contributes to the local implementation details in this scope.
- L13: `"db:push": "drizzle-kit push",` - Contributes to the local implementation details in this scope.
- L14: `"db:migrate": "drizzle-kit migrate",` - Contributes to the local implementation details in this scope.
- L15: `"db:seed": "tsx src/lib/db/seed.ts",` - Contributes to the local implementation details in this scope.
- L16: `"test": "vitest run",` - Contributes to the local implementation details in this scope.
- L17: `"test:watch": "vitest",` - Contributes to the local implementation details in this scope.
- L18: `"test:e2e": "playwright test",` - Contributes to the local implementation details in this scope.
- L19: `"watchdog": "node scripts/codex-watchdog.mjs",` - Contributes to the local implementation details in this scope.
- L20: `"watchdog:once": "node scripts/codex-watchdog.mjs --once"` - Contributes to the local implementation details in this scope.
- L21: `},` - Contributes to the local implementation details in this scope.
- L22: `"dependencies": {` - Contributes to the local implementation details in this scope.
- L23: `"@auth/drizzle-adapter": "^1.10.0",` - Contributes to the local implementation details in this scope.
- L24: `"@tanstack/react-query": "^5.67.2",` - Contributes to the local implementation details in this scope.
- L25: `"bullmq": "^5.43.0",` - Contributes to the local implementation details in this scope.
- L26: `"bcryptjs": "^2.4.3",` - Contributes to the local implementation details in this scope.
- L27: `"drizzle-orm": "^0.39.1",` - Contributes to the local implementation details in this scope.
- L28: `"expr-eval": "^2.0.2",` - Contributes to the local implementation details in this scope.
- L29: `"ioredis": "^5.4.2",` - Contributes to the local implementation details in this scope.
- L30: `"next": "14.2.29",` - Contributes to the local implementation details in this scope.
- L31: `"next-auth": "5.0.0-beta.25",` - Contributes to the local implementation details in this scope.
- L32: `"pino": "^9.6.0",` - Contributes to the local implementation details in this scope.
- L33: `"pg": "^8.13.1",` - Contributes to the local implementation details in this scope.
- L34: `"react": "18.3.1",` - Contributes to the local implementation details in this scope.
- L35: `"react-dom": "18.3.1",` - Contributes to the local implementation details in this scope.
- L36: `"vm2": "^3.9.19",` - Contributes to the local implementation details in this scope.
- L37: `"zod": "^3.24.1",` - Contributes to the local implementation details in this scope.
- L38: `"zustand": "^5.0.3"` - Contributes to the local implementation details in this scope.
- L39: `},` - Contributes to the local implementation details in this scope.
- L40: `"devDependencies": {` - Contributes to the local implementation details in this scope.
- L41: `"@playwright/test": "^1.51.0",` - Contributes to the local implementation details in this scope.
- L42: `"@types/node": "^20.17.19",` - Contributes to the local implementation details in this scope.
- L43: `"@types/pg": "^8.11.11",` - Contributes to the local implementation details in this scope.
- L44: `"@types/react": "^18.3.18",` - Contributes to the local implementation details in this scope.
- L45: `"@types/react-dom": "^18.3.5",` - Contributes to the local implementation details in this scope.
- L46: `"autoprefixer": "^10.4.20",` - Contributes to the local implementation details in this scope.
- L47: `"drizzle-kit": "^0.30.4",` - Contributes to the local implementation details in this scope.
- L48: `"eslint": "^8.57.1",` - Contributes to the local implementation details in this scope.
- L49: `"eslint-config-next": "14.2.29",` - Contributes to the local implementation details in this scope.
- L50: `"postcss": "^8.5.3",` - Contributes to the local implementation details in this scope.
- L51: `"tailwindcss": "^3.4.17",` - Contributes to the local implementation details in this scope.
- L52: `"tsx": "^4.19.2",` - Contributes to the local implementation details in this scope.
- L53: `"typescript": "^5.7.3",` - Contributes to the local implementation details in this scope.
- L54: `"vitest": "^3.0.7"` - Contributes to the local implementation details in this scope.
- L55: `}` - Contributes to the local implementation details in this scope.
- L56: `}` - Contributes to the local implementation details in this scope.

### State management
This file is mostly stateless. Most values are local constants or function parameters.

### Scope and closures
Scope is straightforward: module-level constants and function-local variables with no tricky closure behavior.

### Control flow
Control flow is mostly linear: input comes in, transformations run, and a value is returned.

### Side effects
No major external side effects; this file mostly shapes data or UI.

### TypeScript types and contracts
Type usage is light here; contracts are mostly inferred from function signatures and library types.

## Concepts taught by this file
- state management (useState/useStore)
- database modeling with ORM
- validation with Zod
- background job processing
- authentication and session callbacks
- configuration as code

## Common mistakes
- Changing this file without updating dependent modules.
- Ignoring edge-case error paths.
- Skipping tests/docs for behavior changes.

## Mini exercises
- Rename one variable to improve clarity, then explain why readability improved.
- Add one guard for invalid input and document expected behavior.
- Trace one value from input to output in this file and write the path as comments.

## Further reading
- state management (useState/useStore): search for "React useState and Zustand basics"
- database modeling with ORM: search for "Drizzle ORM schema and relations"
- validation with Zod: search for "Zod schema validation examples"
- background job processing: search for "background workers and job queues Node.js"
- authentication and session callbacks: search for "NextAuth credentials provider callbacks"
- configuration as code: search for "Twelve-Factor App config"
