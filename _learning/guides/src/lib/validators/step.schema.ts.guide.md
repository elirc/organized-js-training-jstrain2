# Guide: src/lib/validators/step.schema.ts

## Purpose
This file defines input validation contracts with Zod so invalid payloads are rejected early and consistently.

## Line-by-line walkthrough

### Imports (what and why)
- L1: `import { z } from "zod";` imports from `zod` so this module can use that dependency.

### Functions and components
- No named function/class declarations were detected; behavior may be configuration/data declarations.

### Ordered walkthrough
- L1: `import { z } from "zod";` - Imports a dependency so this module can use external functionality.
- L3: `export const httpRequestConfigSchema = z.object({` - Declares a constant used to hold configuration, state, or helper logic in this scope.
- L4: `url: z.string().url(),` - Contributes to the local implementation details in this scope.
- L5: `method: z.enum(["GET", "POST", "PUT", "PATCH", "DELETE"]).default("POST"),` - Contributes to the local implementation details in this scope.
- L6: `headers: z.record(z.string()).default({}),` - Contributes to the local implementation details in this scope.
- L7: `body: z.record(z.unknown()).optional(),` - Contributes to the local implementation details in this scope.
- L8: `expectedStatus: z.number().int().min(100).max(599).optional(),` - Contributes to the local implementation details in this scope.
- L9: `});` - Contributes to the local implementation details in this scope.
- L11: `export const transformConfigSchema = z.object({` - Declares a constant used to hold configuration, state, or helper logic in this scope.
- L12: `code: z.string().min(1),` - Contributes to the local implementation details in this scope.
- L13: `});` - Contributes to the local implementation details in this scope.
- L15: `export const conditionConfigSchema = z.object({` - Declares a constant used to hold configuration, state, or helper logic in this scope.
- L16: `expression: z.string().min(1),` - Contributes to the local implementation details in this scope.
- L17: `branches: z` - Contributes to the local implementation details in this scope.
- L18: `.array(` - Contributes to the local implementation details in this scope.
- L19: `z.object({` - Contributes to the local implementation details in this scope.
- L20: `condition: z.string().min(1),` - Contributes to the local implementation details in this scope.
- L21: `nextStepId: z.string().uuid(),` - Contributes to the local implementation details in this scope.
- L22: `}),` - Contributes to the local implementation details in this scope.
- L23: `)` - Contributes to the local implementation details in this scope.
- L24: `.default([]),` - Contributes to the local implementation details in this scope.
- L25: `});` - Contributes to the local implementation details in this scope.
- L27: `export const delayConfigSchema = z.object({` - Declares a constant used to hold configuration, state, or helper logic in this scope.
- L28: `delayMs: z.number().int().min(1).max(86400000),` - Contributes to the local implementation details in this scope.
- L29: `});` - Contributes to the local implementation details in this scope.
- L31: `export const webhookSendConfigSchema = z.object({` - Declares a constant used to hold configuration, state, or helper logic in this scope.
- L32: `url: z.string().url(),` - Contributes to the local implementation details in this scope.
- L33: `method: z.enum(["POST", "PUT", "PATCH"]).default("POST"),` - Contributes to the local implementation details in this scope.
- L34: `headers: z.record(z.string()).default({}),` - Contributes to the local implementation details in this scope.
- L35: `signingSecret: z.string().min(8),` - Contributes to the local implementation details in this scope.
- L36: `});` - Contributes to the local implementation details in this scope.
- L38: `export const loopConfigSchema = z.object({` - Declares a constant used to hold configuration, state, or helper logic in this scope.
- L39: `arrayPath: z.string().min(1),` - Contributes to the local implementation details in this scope.
- L40: `subSteps: z.array(z.record(z.unknown())).default([]),` - Contributes to the local implementation details in this scope.
- L41: `});` - Contributes to the local implementation details in this scope.

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
- database modeling with ORM
- validation with Zod

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
- validation with Zod: search for "Zod schema validation examples"
