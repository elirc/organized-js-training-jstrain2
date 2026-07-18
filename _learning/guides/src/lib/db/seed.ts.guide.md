# Guide: src/lib/db/seed.ts

## Purpose
This file seeds development data so engineers can run and explore the app with realistic records.

## Line-by-line walkthrough

### Imports (what and why)
- L1: `import { eq } from "drizzle-orm";` imports from `drizzle-orm` so this module can use that dependency.
- L2: `import { db, pool } from "@/lib/db";` imports from `@/lib/db` so this module can use that dependency.
- L3: `import { tenantMembers, tenants, users, workflowSteps, workflows } from "@/lib/db/schema";` imports from `@/lib/db/schema` so this module can use that dependency.
- L4: `import { hashPassword, randomSecret } from "@/lib/utils/crypto";` imports from `@/lib/utils/crypto` so this module can use that dependency.

### Functions and components
- L6: **run** (async function) - signature: `async function run(): Promise<void> {`.

### Ordered walkthrough
- L1: `import { eq } from "drizzle-orm";` - Imports a dependency so this module can use external functionality.
- L2: `import { db, pool } from "@/lib/db";` - Imports a dependency so this module can use external functionality.
- L3: `import { tenantMembers, tenants, users, workflowSteps, workflows } from "@/lib/db/schema";` - Imports a dependency so this module can use external functionality.
- L4: `import { hashPassword, randomSecret } from "@/lib/utils/crypto";` - Imports a dependency so this module can use external functionality.
- L6: `async function run(): Promise<void> {` - Defines a function entrypoint that encapsulates one unit of behavior.
- L7: `const existingUser = await db.query.users.findFirst({` - Declares a constant used to hold configuration, state, or helper logic in this scope.
- L8: `where: eq(users.email, "test@flowpilot.dev"),` - Contributes to the local implementation details in this scope.
- L9: `});` - Contributes to the local implementation details in this scope.
- L11: `let userId = existingUser?.id;` - Declares mutable state inside this module scope.
- L12: `if (!userId) {` - Branches control flow so different code paths run under different conditions.
- L13: `const passwordHash = await hashPassword("password123");` - Declares a constant used to hold configuration, state, or helper logic in this scope.
- L14: `const [created] = await db` - Declares a constant used to hold configuration, state, or helper logic in this scope.
- L15: `.insert(users)` - Interacts with the database; this is a persistent side effect.
- L16: `.values({` - Contributes to the local implementation details in this scope.
- L17: `email: "test@flowpilot.dev",` - Contributes to the local implementation details in this scope.
- L18: `passwordHash,` - Contributes to the local implementation details in this scope.
- L19: `name: "FlowPilot Test User",` - Contributes to the local implementation details in this scope.
- L20: `})` - Contributes to the local implementation details in this scope.
- L21: `.returning({ id: users.id });` - Contributes to the local implementation details in this scope.
- L22: `userId = created.id;` - Contributes to the local implementation details in this scope.
- L23: `}` - Contributes to the local implementation details in this scope.
- L25: `const existingTenant = await db.query.tenants.findFirst({ where: eq(tenants.slug, "acme") });` - Declares a constant used to hold configuration, state, or helper logic in this scope.
- L26: `let tenantId = existingTenant?.id;` - Declares mutable state inside this module scope.
- L27: `if (!tenantId) {` - Branches control flow so different code paths run under different conditions.
- L28: `const [createdTenant] = await db` - Declares a constant used to hold configuration, state, or helper logic in this scope.
- L29: `.insert(tenants)` - Interacts with the database; this is a persistent side effect.
- L30: `.values({ name: "Acme Corp", slug: "acme", plan: "pro", maxConcurrency: 5, maxWorkflows: 100 })` - Contributes to the local implementation details in this scope.
- L31: `.returning({ id: tenants.id });` - Contributes to the local implementation details in this scope.
- L32: `tenantId = createdTenant.id;` - Contributes to the local implementation details in this scope.
- L33: `}` - Contributes to the local implementation details in this scope.
- L35: `await db` - Contributes to the local implementation details in this scope.
- L36: `.insert(tenantMembers)` - Interacts with the database; this is a persistent side effect.
- L37: `.values({ tenantId, userId, role: "owner" })` - Contributes to the local implementation details in this scope.
- L38: `.onConflictDoNothing({ target: [tenantMembers.tenantId, tenantMembers.userId] });` - Contributes to the local implementation details in this scope.
- L40: `const samples = [` - Declares a constant used to hold configuration, state, or helper logic in this scope.
- L41: `{` - Contributes to the local implementation details in this scope.
- L42: `name: "GitHub PR Notifier",` - Contributes to the local implementation details in this scope.
- L43: `triggerType: "webhook",` - Contributes to the local implementation details in this scope.
- L44: `triggerConfig: { source: "github" },` - Contributes to the local implementation details in this scope.
- L45: `steps: [` - Contributes to the local implementation details in this scope.
- L46: `{ stepType: "transform", name: "Extract PR Data", config: { code: "return { title: input.payload?.pull_request?.title, author: input.payload?.pull_request?.user` - Contributes to the local implementation details in this scope.
- L47: `{ stepType: "http_request", name: "Post to Slack", config: { url: "https://example.com/slack-webhook", method: "POST", body: { text: "{{steps.extract_pr_data.ou` - Contributes to the local implementation details in this scope.
- L48: `],` - Contributes to the local implementation details in this scope.
- L49: `},` - Contributes to the local implementation details in this scope.
- L50: `{` - Contributes to the local implementation details in this scope.
- L51: `name: "Data Pipeline",` - Contributes to the local implementation details in this scope.
- L52: `triggerType: "manual",` - Contributes to the local implementation details in this scope.
- L53: `triggerConfig: {},` - Contributes to the local implementation details in this scope.
- L54: `steps: [` - Contributes to the local implementation details in this scope.
- L55: `{ stepType: "http_request", name: "Fetch CSV", config: { url: "https://example.com/data.csv", method: "GET" } },` - Contributes to the local implementation details in this scope.
- L56: `{ stepType: "transform", name: "Parse Rows", config: { code: "return { rows: (input.responseText || '').split('\\n').length };" } },` - Contributes to the local implementation details in this scope.
- L57: `{ stepType: "webhook_send", name: "Notify Completion", config: { url: "https://example.com/notify", method: "POST", signingSecret: randomSecret(16) } },` - Contributes to the local implementation details in this scope.
- L58: `],` - Contributes to the local implementation details in this scope.
- L59: `},` - Contributes to the local implementation details in this scope.
- L60: `{` - Contributes to the local implementation details in this scope.
- L61: `name: "Conditional Router",` - Contributes to the local implementation details in this scope.
- L62: `triggerType: "webhook",` - Contributes to the local implementation details in this scope.
- L63: `triggerConfig: { source: "generic" },` - Contributes to the local implementation details in this scope.
- L64: `steps: [` - Contributes to the local implementation details in this scope.
- L65: `{ stepType: "transform", name: "Extract Type", config: { code: "return { type: input.payload?.type };" } },` - Contributes to the local implementation details in this scope.
- L66: `{` - Contributes to the local implementation details in this scope.
- L67: `stepType: "condition",` - Contributes to the local implementation details in this scope.
- L68: `name: "Route by Type",` - Contributes to the local implementation details in this scope.
- L69: `config: {` - Contributes to the local implementation details in this scope.
- L70: `expression: "steps.extract_type.output.type",` - Contributes to the local implementation details in this scope.
- L71: `branches: [` - Contributes to the local implementation details in this scope.
- L72: `{ condition: "steps.extract_type.output.type == 'order'", nextStepId: "branch-order" },` - Contributes to the local implementation details in this scope.
- L73: `{ condition: "steps.extract_type.output.type == 'refund'", nextStepId: "branch-refund" },` - Contributes to the local implementation details in this scope.
- L74: `],` - Contributes to the local implementation details in this scope.
- L75: `},` - Contributes to the local implementation details in this scope.
- L76: `},` - Contributes to the local implementation details in this scope.
- L77: `],` - Contributes to the local implementation details in this scope.
- L78: `},` - Contributes to the local implementation details in this scope.
- L79: `] as const;` - Contributes to the local implementation details in this scope.
- L81: `for (const sample of samples) {` - Iterates over data to apply repeated behavior.
- L82: `const existingWorkflow = await db.query.workflows.findFirst({` - Declares a constant used to hold configuration, state, or helper logic in this scope.
- L83: `where: eq(workflows.name, sample.name),` - Contributes to the local implementation details in this scope.
- L84: `});` - Contributes to the local implementation details in this scope.
- L85: `if (existingWorkflow) {` - Branches control flow so different code paths run under different conditions.
- L86: `continue;` - Contributes to the local implementation details in this scope.
- L87: `}` - Contributes to the local implementation details in this scope.
- L89: `const [createdWorkflow] = await db` - Declares a constant used to hold configuration, state, or helper logic in this scope.
- L90: `.insert(workflows)` - Interacts with the database; this is a persistent side effect.
- L91: `.values({` - Contributes to the local implementation details in this scope.
- L92: `tenantId,` - Contributes to the local implementation details in this scope.
- L93: `createdBy: userId,` - Contributes to the local implementation details in this scope.
- L94: `name: sample.name,` - Contributes to the local implementation details in this scope.
- L95: `triggerType: sample.triggerType,` - Contributes to the local implementation details in this scope.
- L96: `triggerConfig: sample.triggerConfig,` - Contributes to the local implementation details in this scope.
- L97: `})` - Contributes to the local implementation details in this scope.
- L98: `.returning({ id: workflows.id });` - Contributes to the local implementation details in this scope.
- L100: `await db.insert(workflowSteps).values(` - Interacts with the database; this is a persistent side effect.
- L101: `sample.steps.map((step, index) => ({` - Contributes to the local implementation details in this scope.
- L102: `workflowId: createdWorkflow.id,` - Contributes to the local implementation details in this scope.
- L103: `stepType: step.stepType,` - Contributes to the local implementation details in this scope.
- L104: `name: step.name,` - Contributes to the local implementation details in this scope.
- L105: `position: index,` - Contributes to the local implementation details in this scope.
- L106: `config: step.config,` - Contributes to the local implementation details in this scope.
- L107: `inputMapping: {},` - Contributes to the local implementation details in this scope.
- L108: `})),` - Contributes to the local implementation details in this scope.
- L109: `);` - Contributes to the local implementation details in this scope.
- L110: `}` - Contributes to the local implementation details in this scope.
- L111: `}` - Contributes to the local implementation details in this scope.
- L113: `run()` - Contributes to the local implementation details in this scope.
- L114: `.then(async () => {` - Contributes to the local implementation details in this scope.
- L115: `await pool.end();` - Contributes to the local implementation details in this scope.
- L116: `process.exit(0);` - Contributes to the local implementation details in this scope.
- L117: `})` - Contributes to the local implementation details in this scope.
- L118: `.catch(async (error: unknown) => {` - Contributes to the local implementation details in this scope.
- L119: `console.error(error);` - Contributes to the local implementation details in this scope.
- L120: `await pool.end();` - Contributes to the local implementation details in this scope.
- L121: `process.exit(1);` - Contributes to the local implementation details in this scope.
- L122: `});` - Contributes to the local implementation details in this scope.

### State management
This file is mostly stateless. Most values are local constants or function parameters.

### Scope and closures
- L7: Module/function-scoped constant provides stable reference.
- L13: Module/function-scoped constant provides stable reference.
- L14: Module/function-scoped constant provides stable reference.
- L25: Module/function-scoped constant provides stable reference.
- L28: Module/function-scoped constant provides stable reference.
- L40: Module/function-scoped constant provides stable reference.
- L82: Module/function-scoped constant provides stable reference.
- L89: Module/function-scoped constant provides stable reference.

### Control flow
- L12: Conditional branch chooses behavior based on runtime input.
- L27: Conditional branch chooses behavior based on runtime input.
- L81: Loop processes repeated data/work.
- L85: Conditional branch chooses behavior based on runtime input.

### Side effects
- L7: Database IO side effect.
- L25: Database IO side effect.
- L82: Database IO side effect.
- L100: Database IO side effect.

### TypeScript types and contracts
- L6: Promise return type signals async contract.

## Concepts taught by this file
- database modeling with ORM
- TypeScript type contracts
- async/await control flow
- configuration as code

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
- TypeScript type contracts: search for "TypeScript interfaces vs types"
- async/await control flow: search for "JavaScript async await error handling"
- configuration as code: search for "Twelve-Factor App config"
