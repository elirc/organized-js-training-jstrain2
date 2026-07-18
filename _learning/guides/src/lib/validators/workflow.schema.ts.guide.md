# Guide: src/lib/validators/workflow.schema.ts

## Purpose
This file defines input validation contracts with Zod so invalid payloads are rejected early and consistently.

## Line-by-line walkthrough

### Imports (what and why)
- L1: `import { z } from "zod";` imports from `zod` so this module can use that dependency.

### Functions and components
- No named function/class declarations were detected; behavior may be configuration/data declarations.

### Ordered walkthrough
- L1: `import { z } from "zod";` - Imports a dependency so this module can use external functionality.
- L3: `const retryConfigSchema = z.object({` - Declares a constant used to hold configuration, state, or helper logic in this scope.
- L4: `maxRetries: z.number().int().min(0).max(10).default(3),` - Contributes to the local implementation details in this scope.
- L5: `backoffMs: z.number().int().min(100).max(60000).default(1000),` - Contributes to the local implementation details in this scope.
- L6: `backoffMultiplier: z.number().min(1).max(10).default(2),` - Contributes to the local implementation details in this scope.
- L7: `});` - Contributes to the local implementation details in this scope.
- L9: `export const stepInputSchema = z.object({` - Declares a constant used to hold configuration, state, or helper logic in this scope.
- L10: `id: z.string().uuid().optional(),` - Contributes to the local implementation details in this scope.
- L11: `stepType: z.enum(["http_request", "transform", "condition", "delay", "webhook_send", "loop"]),` - Contributes to the local implementation details in this scope.
- L12: `name: z.string().min(1).max(255),` - Contributes to the local implementation details in this scope.
- L13: `position: z.number().int().min(0),` - Contributes to the local implementation details in this scope.
- L14: `config: z.record(z.unknown()).default({}),` - Contributes to the local implementation details in this scope.
- L15: `inputMapping: z.record(z.unknown()).default({}),` - Contributes to the local implementation details in this scope.
- L16: `timeoutMs: z.number().int().min(100).max(300000).default(30000),` - Contributes to the local implementation details in this scope.
- L17: `retryConfig: retryConfigSchema.default({ maxRetries: 3, backoffMs: 1000, backoffMultiplier: 2 }),` - Contributes to the local implementation details in this scope.
- L18: `onFailure: z.string().default("stop"),` - Contributes to the local implementation details in this scope.
- L19: `nextStepId: z.string().uuid().nullable().optional(),` - Contributes to the local implementation details in this scope.
- L20: `conditionBranches: z` - Contributes to the local implementation details in this scope.
- L21: `.array(` - Contributes to the local implementation details in this scope.
- L22: `z.object({` - Contributes to the local implementation details in this scope.
- L23: `expression: z.string().min(1),` - Contributes to the local implementation details in this scope.
- L24: `nextStepId: z.string().uuid(),` - Contributes to the local implementation details in this scope.
- L25: `}),` - Contributes to the local implementation details in this scope.
- L26: `)` - Contributes to the local implementation details in this scope.
- L27: `.nullable()` - Contributes to the local implementation details in this scope.
- L28: `.optional(),` - Contributes to the local implementation details in this scope.
- L29: `});` - Contributes to the local implementation details in this scope.
- L31: `export const workflowCreateSchema = z.object({` - Declares a constant used to hold configuration, state, or helper logic in this scope.
- L32: `name: z.string().min(1).max(255),` - Contributes to the local implementation details in this scope.
- L33: `description: z.string().max(4000).nullable().optional(),` - Contributes to the local implementation details in this scope.
- L34: `triggerType: z.enum(["manual", "webhook", "schedule"]),` - Contributes to the local implementation details in this scope.
- L35: `triggerConfig: z.record(z.unknown()).default({}),` - Contributes to the local implementation details in this scope.
- L36: `isActive: z.boolean().default(true),` - Contributes to the local implementation details in this scope.
- L37: `steps: z.array(stepInputSchema).default([]),` - Contributes to the local implementation details in this scope.
- L38: `});` - Contributes to the local implementation details in this scope.
- L40: `export const workflowUpdateSchema = workflowCreateSchema.partial().extend({` - Declares a constant used to hold configuration, state, or helper logic in this scope.
- L41: `steps: z.array(stepInputSchema).optional(),` - Contributes to the local implementation details in this scope.
- L42: `});` - Contributes to the local implementation details in this scope.
- L44: `export const paginationSchema = z.object({` - Declares a constant used to hold configuration, state, or helper logic in this scope.
- L45: `cursor: z.string().uuid().optional(),` - Contributes to the local implementation details in this scope.
- L46: `limit: z.coerce.number().int().min(1).max(100).default(20),` - Contributes to the local implementation details in this scope.
- L47: `});` - Contributes to the local implementation details in this scope.
- L49: `export type WorkflowCreateInput = z.infer<typeof workflowCreateSchema>;` - Defines a TypeScript type alias used to make data contracts explicit.
- L50: `export type WorkflowUpdateInput = z.infer<typeof workflowUpdateSchema>;` - Defines a TypeScript type alias used to make data contracts explicit.
- L51: `export type StepInputSchema = z.infer<typeof stepInputSchema>;` - Defines a TypeScript type alias used to make data contracts explicit.

### State management
This file is mostly stateless. Most values are local constants or function parameters.

### Scope and closures
- L3: Module/function-scoped constant provides stable reference.

### Control flow
Control flow is mostly linear: input comes in, transformations run, and a value is returned.

### Side effects
No major external side effects; this file mostly shapes data or UI.

### TypeScript types and contracts
- L49: Type alias encodes domain vocabulary.
- L50: Type alias encodes domain vocabulary.
- L51: Type alias encodes domain vocabulary.

## Concepts taught by this file
- database modeling with ORM
- validation with Zod
- TypeScript type contracts
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
- database modeling with ORM: search for "Drizzle ORM schema and relations"
- validation with Zod: search for "Zod schema validation examples"
- TypeScript type contracts: search for "TypeScript interfaces vs types"
- configuration as code: search for "Twelve-Factor App config"
