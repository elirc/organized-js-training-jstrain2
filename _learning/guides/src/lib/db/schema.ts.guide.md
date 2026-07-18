# Guide: src/lib/db/schema.ts

## Purpose
This file defines the database schema as code. It is the single source of truth for tables, columns, constraints, and indexes used by the rest of the backend.

## Line-by-line walkthrough

### Imports (what and why)
- L1: `import { sql } from "drizzle-orm";` imports from `drizzle-orm` so this module can use that dependency.
- L2: `import {` imports from `inline/module` so this module can use that dependency.

### Functions and components
- No named function/class declarations were detected; behavior may be configuration/data declarations.

### Ordered walkthrough
- L1: `import { sql } from "drizzle-orm";` - Imports a dependency so this module can use external functionality.
- L2: `import {` - Imports a dependency so this module can use external functionality.
- L3: `bigserial,` - Contributes to the local implementation details in this scope.
- L4: `boolean,` - Contributes to the local implementation details in this scope.
- L5: `index,` - Contributes to the local implementation details in this scope.
- L6: `integer,` - Contributes to the local implementation details in this scope.
- L7: `jsonb,` - Contributes to the local implementation details in this scope.
- L8: `pgTable,` - Contributes to the local implementation details in this scope.
- L9: `primaryKey,` - Contributes to the local implementation details in this scope.
- L10: `text,` - Contributes to the local implementation details in this scope.
- L11: `timestamp,` - Contributes to the local implementation details in this scope.
- L12: `unique,` - Contributes to the local implementation details in this scope.
- L13: `uuid,` - Contributes to the local implementation details in this scope.
- L14: `varchar,` - Contributes to the local implementation details in this scope.
- L15: `} from "drizzle-orm/pg-core";` - Contributes to the local implementation details in this scope.
- L17: `export const users = pgTable("users", {` - Declares a constant used to hold configuration, state, or helper logic in this scope.
- L18: `id: uuid("id").defaultRandom().primaryKey(),` - Contributes to the local implementation details in this scope.
- L19: `email: varchar("email", { length: 255 }).notNull().unique(),` - Contributes to the local implementation details in this scope.
- L20: `passwordHash: varchar("password_hash", { length: 255 }),` - Contributes to the local implementation details in this scope.
- L21: `name: varchar("name", { length: 255 }),` - Contributes to the local implementation details in this scope.
- L22: `avatarUrl: text("avatar_url"),` - Contributes to the local implementation details in this scope.
- L23: `createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),` - Contributes to the local implementation details in this scope.
- L24: `updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),` - Contributes to the local implementation details in this scope.
- L25: `});` - Contributes to the local implementation details in this scope.
- L27: `export const tenants = pgTable("tenants", {` - Declares a constant used to hold configuration, state, or helper logic in this scope.
- L28: `id: uuid("id").defaultRandom().primaryKey(),` - Contributes to the local implementation details in this scope.
- L29: `name: varchar("name", { length: 255 }).notNull(),` - Contributes to the local implementation details in this scope.
- L30: `slug: varchar("slug", { length: 100 }).notNull().unique(),` - Contributes to the local implementation details in this scope.
- L31: `plan: varchar("plan", { length: 50 }).default("free").notNull(),` - Contributes to the local implementation details in this scope.
- L32: `maxConcurrency: integer("max_concurrency").default(5).notNull(),` - Contributes to the local implementation details in this scope.
- L33: `maxWorkflows: integer("max_workflows").default(10).notNull(),` - Contributes to the local implementation details in this scope.
- L34: `createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),` - Contributes to the local implementation details in this scope.
- L35: `});` - Contributes to the local implementation details in this scope.
- L37: `export const tenantMembers = pgTable(` - Declares a constant used to hold configuration, state, or helper logic in this scope.
- L38: `"tenant_members",` - Contributes to the local implementation details in this scope.
- L39: `{` - Contributes to the local implementation details in this scope.
- L40: `id: uuid("id").defaultRandom().primaryKey(),` - Contributes to the local implementation details in this scope.
- L41: `tenantId: uuid("tenant_id")` - Contributes to the local implementation details in this scope.
- L42: `.notNull()` - Contributes to the local implementation details in this scope.
- L43: `.references(() => tenants.id, { onDelete: "cascade" }),` - Contributes to the local implementation details in this scope.
- L44: `userId: uuid("user_id")` - Contributes to the local implementation details in this scope.
- L45: `.notNull()` - Contributes to the local implementation details in this scope.
- L46: `.references(() => users.id, { onDelete: "cascade" }),` - Contributes to the local implementation details in this scope.
- L47: `role: varchar("role", { length: 50 }).default("member").notNull(),` - Contributes to the local implementation details in this scope.
- L48: `createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),` - Contributes to the local implementation details in this scope.
- L49: `},` - Contributes to the local implementation details in this scope.
- L50: `(table) => ({` - Contributes to the local implementation details in this scope.
- L51: `tenantUserUnique: unique("tenant_members_tenant_user_unique").on(table.tenantId, table.userId),` - Contributes to the local implementation details in this scope.
- L52: `}),` - Contributes to the local implementation details in this scope.
- L53: `);` - Contributes to the local implementation details in this scope.
- L55: `export const workflows = pgTable(` - Declares a constant used to hold configuration, state, or helper logic in this scope.
- L56: `"workflows",` - Contributes to the local implementation details in this scope.
- L57: `{` - Contributes to the local implementation details in this scope.
- L58: `id: uuid("id").defaultRandom().primaryKey(),` - Contributes to the local implementation details in this scope.
- L59: `tenantId: uuid("tenant_id")` - Contributes to the local implementation details in this scope.
- L60: `.notNull()` - Contributes to the local implementation details in this scope.
- L61: `.references(() => tenants.id, { onDelete: "cascade" }),` - Contributes to the local implementation details in this scope.
- L62: `createdBy: uuid("created_by").references(() => users.id),` - Contributes to the local implementation details in this scope.
- L63: `name: varchar("name", { length: 255 }).notNull(),` - Contributes to the local implementation details in this scope.
- L64: `description: text("description"),` - Contributes to the local implementation details in this scope.
- L65: `triggerType: varchar("trigger_type", { length: 50 }).notNull(),` - Contributes to the local implementation details in this scope.
- L66: `triggerConfig: jsonb("trigger_config").$type<Record<string, unknown>>().default(sql\`'{}'::jsonb\`).notNull(),` - Contributes to the local implementation details in this scope.
- L67: `isActive: boolean("is_active").default(true).notNull(),` - Contributes to the local implementation details in this scope.
- L68: `version: integer("version").default(1).notNull(),` - Contributes to the local implementation details in this scope.
- L69: `createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),` - Contributes to the local implementation details in this scope.
- L70: `updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),` - Contributes to the local implementation details in this scope.
- L71: `},` - Contributes to the local implementation details in this scope.
- L72: `(table) => ({` - Contributes to the local implementation details in this scope.
- L73: `tenantIdx: index("idx_workflows_tenant").on(table.tenantId),` - Contributes to the local implementation details in this scope.
- L74: `}),` - Contributes to the local implementation details in this scope.
- L75: `);` - Contributes to the local implementation details in this scope.
- L77: `export const workflowSteps = pgTable(` - Declares a constant used to hold configuration, state, or helper logic in this scope.
- L78: `"workflow_steps",` - Contributes to the local implementation details in this scope.
- L79: `{` - Contributes to the local implementation details in this scope.
- L80: `id: uuid("id").defaultRandom().primaryKey(),` - Contributes to the local implementation details in this scope.
- L81: `workflowId: uuid("workflow_id")` - Contributes to the local implementation details in this scope.
- L82: `.notNull()` - Contributes to the local implementation details in this scope.
- L83: `.references(() => workflows.id, { onDelete: "cascade" }),` - Contributes to the local implementation details in this scope.
- L84: `stepType: varchar("step_type", { length: 50 }).notNull(),` - Contributes to the local implementation details in this scope.
- L85: `name: varchar("name", { length: 255 }).notNull(),` - Contributes to the local implementation details in this scope.
- L86: `position: integer("position").notNull(),` - Contributes to the local implementation details in this scope.
- L87: `config: jsonb("config").$type<Record<string, unknown>>().notNull(),` - Contributes to the local implementation details in this scope.
- L88: `inputMapping: jsonb("input_mapping").$type<Record<string, unknown>>().default(sql\`'{}'::jsonb\`).notNull(),` - Contributes to the local implementation details in this scope.
- L89: `timeoutMs: integer("timeout_ms").default(30000).notNull(),` - Contributes to the local implementation details in this scope.
- L90: `retryConfig: jsonb("retry_config")` - Contributes to the local implementation details in this scope.
- L91: `.$type<Record<string, unknown>>()` - Contributes to the local implementation details in this scope.
- L92: `.default(sql\`'{"maxRetries":3,"backoffMs":1000,"backoffMultiplier":2}'::jsonb\`)` - Contributes to the local implementation details in this scope.
- L93: `.notNull(),` - Contributes to the local implementation details in this scope.
- L94: `onFailure: varchar("on_failure", { length: 50 }).default("stop").notNull(),` - Contributes to the local implementation details in this scope.
- L95: `nextStepId: uuid("next_step_id"),` - Contributes to the local implementation details in this scope.
- L96: `conditionBranches: jsonb("condition_branches").$type<Array<Record<string, unknown>> | null>(),` - Contributes to the local implementation details in this scope.
- L97: `createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),` - Contributes to the local implementation details in this scope.
- L98: `},` - Contributes to the local implementation details in this scope.
- L99: `(table) => ({` - Contributes to the local implementation details in this scope.
- L100: `workflowPositionIdx: index("idx_steps_workflow").on(table.workflowId, table.position),` - Contributes to the local implementation details in this scope.
- L101: `}),` - Contributes to the local implementation details in this scope.
- L102: `);` - Contributes to the local implementation details in this scope.
- L104: `export const workflowRuns = pgTable(` - Declares a constant used to hold configuration, state, or helper logic in this scope.
- L105: `"workflow_runs",` - Contributes to the local implementation details in this scope.
- L106: `{` - Contributes to the local implementation details in this scope.
- L107: `id: uuid("id").defaultRandom().primaryKey(),` - Contributes to the local implementation details in this scope.
- L108: `workflowId: uuid("workflow_id")` - Contributes to the local implementation details in this scope.
- L109: `.notNull()` - Contributes to the local implementation details in this scope.
- L110: `.references(() => workflows.id, { onDelete: "cascade" }),` - Contributes to the local implementation details in this scope.
- L111: `tenantId: uuid("tenant_id")` - Contributes to the local implementation details in this scope.
- L112: `.notNull()` - Contributes to the local implementation details in this scope.
- L113: `.references(() => tenants.id),` - Contributes to the local implementation details in this scope.
- L114: `triggeredBy: varchar("triggered_by", { length: 50 }).notNull(),` - Contributes to the local implementation details in this scope.
- L115: `triggerData: jsonb("trigger_data").$type<Record<string, unknown>>().default(sql\`'{}'::jsonb\`).notNull(),` - Contributes to the local implementation details in this scope.
- L116: `idempotencyKey: varchar("idempotency_key", { length: 255 }),` - Contributes to the local implementation details in this scope.
- L117: `status: varchar("status", { length: 50 }).default("pending").notNull(),` - Contributes to the local implementation details in this scope.
- L118: `startedAt: timestamp("started_at", { withTimezone: true }),` - Contributes to the local implementation details in this scope.
- L119: `completedAt: timestamp("completed_at", { withTimezone: true }),` - Contributes to the local implementation details in this scope.
- L120: `durationMs: integer("duration_ms"),` - Contributes to the local implementation details in this scope.
- L121: `error: text("error"),` - Contributes to the local implementation details in this scope.
- L122: `workflowVersion: integer("workflow_version"),` - Contributes to the local implementation details in this scope.
- L123: `contextData: jsonb("context_data").$type<Record<string, unknown>>().default(sql\`'{}'::jsonb\`).notNull(),` - Contributes to the local implementation details in this scope.
- L124: `createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),` - Contributes to the local implementation details in this scope.
- L125: `},` - Contributes to the local implementation details in this scope.
- L126: `(table) => ({` - Contributes to the local implementation details in this scope.
- L127: `workflowIdx: index("idx_runs_workflow").on(table.workflowId),` - Contributes to the local implementation details in this scope.
- L128: `tenantStatusIdx: index("idx_runs_tenant_status").on(table.tenantId, table.status),` - Contributes to the local implementation details in this scope.
- L129: `idempotencyIdx: index("idx_runs_idempotency").on(table.idempotencyKey).where(sql\`${table.idempotencyKey} is not null\`),` - Contributes to the local implementation details in this scope.
- L130: `}),` - Contributes to the local implementation details in this scope.
- L131: `);` - Contributes to the local implementation details in this scope.
- L133: `export const stepLogs = pgTable(` - Declares a constant used to hold configuration, state, or helper logic in this scope.
- L134: `"step_logs",` - Contributes to the local implementation details in this scope.
- L135: `{` - Contributes to the local implementation details in this scope.
- L136: `id: uuid("id").defaultRandom().primaryKey(),` - Contributes to the local implementation details in this scope.
- L137: `runId: uuid("run_id")` - Contributes to the local implementation details in this scope.
- L138: `.notNull()` - Contributes to the local implementation details in this scope.
- L139: `.references(() => workflowRuns.id, { onDelete: "cascade" }),` - Contributes to the local implementation details in this scope.
- L140: `stepId: uuid("step_id").references(() => workflowSteps.id),` - Contributes to the local implementation details in this scope.
- L141: `stepName: varchar("step_name", { length: 255 }),` - Contributes to the local implementation details in this scope.
- L142: `stepType: varchar("step_type", { length: 50 }),` - Contributes to the local implementation details in this scope.
- L143: `status: varchar("status", { length: 50 }).default("pending").notNull(),` - Contributes to the local implementation details in this scope.
- L144: `attempt: integer("attempt").default(1).notNull(),` - Contributes to the local implementation details in this scope.
- L145: `inputData: jsonb("input_data").$type<Record<string, unknown> | null>(),` - Contributes to the local implementation details in this scope.
- L146: `outputData: jsonb("output_data").$type<Record<string, unknown> | null>(),` - Contributes to the local implementation details in this scope.
- L147: `error: text("error"),` - Contributes to the local implementation details in this scope.
- L148: `errorCode: varchar("error_code", { length: 100 }),` - Contributes to the local implementation details in this scope.
- L149: `startedAt: timestamp("started_at", { withTimezone: true }),` - Contributes to the local implementation details in this scope.
- L150: `completedAt: timestamp("completed_at", { withTimezone: true }),` - Contributes to the local implementation details in this scope.
- L151: `durationMs: integer("duration_ms"),` - Contributes to the local implementation details in this scope.
- L152: `createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),` - Contributes to the local implementation details in this scope.
- L153: `},` - Contributes to the local implementation details in this scope.
- L154: `(table) => ({` - Contributes to the local implementation details in this scope.
- L155: `runIdx: index("idx_step_logs_run").on(table.runId),` - Contributes to the local implementation details in this scope.
- L156: `stepIdx: index("idx_step_logs_step").on(table.stepId),` - Contributes to the local implementation details in this scope.
- L157: `}),` - Contributes to the local implementation details in this scope.
- L158: `);` - Contributes to the local implementation details in this scope.
- L160: `export const webhookEndpoints = pgTable("webhook_endpoints", {` - Declares a constant used to hold configuration, state, or helper logic in this scope.
- L161: `id: uuid("id").defaultRandom().primaryKey(),` - Contributes to the local implementation details in this scope.
- L162: `tenantId: uuid("tenant_id")` - Contributes to the local implementation details in this scope.
- L163: `.notNull()` - Contributes to the local implementation details in this scope.
- L164: `.references(() => tenants.id, { onDelete: "cascade" }),` - Contributes to the local implementation details in this scope.
- L165: `workflowId: uuid("workflow_id")` - Contributes to the local implementation details in this scope.
- L166: `.notNull()` - Contributes to the local implementation details in this scope.
- L167: `.references(() => workflows.id, { onDelete: "cascade" }),` - Contributes to the local implementation details in this scope.
- L168: `path: varchar("path", { length: 255 }).notNull().unique(),` - Contributes to the local implementation details in this scope.
- L169: `signingSecret: varchar("signing_secret", { length: 255 }).notNull(),` - Contributes to the local implementation details in this scope.
- L170: `isActive: boolean("is_active").default(true).notNull(),` - Contributes to the local implementation details in this scope.
- L171: `lastTriggered: timestamp("last_triggered", { withTimezone: true }),` - Contributes to the local implementation details in this scope.
- L172: `createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),` - Contributes to the local implementation details in this scope.
- L173: `});` - Contributes to the local implementation details in this scope.
- L175: `export const webhookDeliveries = pgTable("webhook_deliveries", {` - Declares a constant used to hold configuration, state, or helper logic in this scope.
- L176: `id: uuid("id").defaultRandom().primaryKey(),` - Contributes to the local implementation details in this scope.
- L177: `runId: uuid("run_id").references(() => workflowRuns.id),` - Contributes to the local implementation details in this scope.
- L178: `stepLogId: uuid("step_log_id").references(() => stepLogs.id),` - Contributes to the local implementation details in this scope.
- L179: `url: text("url").notNull(),` - Contributes to the local implementation details in this scope.
- L180: `method: varchar("method", { length: 10 }).default("POST").notNull(),` - Contributes to the local implementation details in this scope.
- L181: `headers: jsonb("headers").$type<Record<string, string> | null>(),` - Contributes to the local implementation details in this scope.
- L182: `requestBody: jsonb("request_body").$type<Record<string, unknown> | null>(),` - Contributes to the local implementation details in this scope.
- L183: `responseStatus: integer("response_status"),` - Contributes to the local implementation details in this scope.
- L184: `responseBody: text("response_body"),` - Contributes to the local implementation details in this scope.
- L185: `signature: varchar("signature", { length: 255 }),` - Contributes to the local implementation details in this scope.
- L186: `attempt: integer("attempt").default(1).notNull(),` - Contributes to the local implementation details in this scope.
- L187: `status: varchar("status", { length: 50 }),` - Contributes to the local implementation details in this scope.
- L188: `createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),` - Contributes to the local implementation details in this scope.
- L189: `});` - Contributes to the local implementation details in this scope.
- L191: `export const idempotencyKeys = pgTable(` - Declares a constant used to hold configuration, state, or helper logic in this scope.
- L192: `"idempotency_keys",` - Contributes to the local implementation details in this scope.
- L193: `{` - Contributes to the local implementation details in this scope.
- L194: `id: uuid("id").defaultRandom().primaryKey(),` - Contributes to the local implementation details in this scope.
- L195: `key: varchar("key", { length: 255 }).notNull(),` - Contributes to the local implementation details in this scope.
- L196: `tenantId: uuid("tenant_id").references(() => tenants.id),` - Contributes to the local implementation details in this scope.
- L197: `runId: uuid("run_id").references(() => workflowRuns.id),` - Contributes to the local implementation details in this scope.
- L198: `createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),` - Contributes to the local implementation details in this scope.
- L199: `expiresAt: timestamp("expires_at", { withTimezone: true }).notNull(),` - Contributes to the local implementation details in this scope.
- L200: `},` - Contributes to the local implementation details in this scope.
- L201: `(table) => ({` - Contributes to the local implementation details in this scope.
- L202: `tenantKeyUnique: unique("idempotency_keys_key_tenant_unique").on(table.key, table.tenantId),` - Contributes to the local implementation details in this scope.
- L203: `expiresIdx: index("idx_idempotency_expires").on(table.expiresAt),` - Contributes to the local implementation details in this scope.
- L204: `}),` - Contributes to the local implementation details in this scope.
- L205: `);` - Contributes to the local implementation details in this scope.
- L207: `export const eventLog = pgTable(` - Declares a constant used to hold configuration, state, or helper logic in this scope.
- L208: `"event_log",` - Contributes to the local implementation details in this scope.
- L209: `{` - Contributes to the local implementation details in this scope.
- L210: `id: bigserial("id", { mode: "number" }).primaryKey(),` - Contributes to the local implementation details in this scope.
- L211: `tenantId: uuid("tenant_id").references(() => tenants.id),` - Contributes to the local implementation details in this scope.
- L212: `eventType: varchar("event_type", { length: 100 }).notNull(),` - Contributes to the local implementation details in this scope.
- L213: `entityType: varchar("entity_type", { length: 50 }),` - Contributes to the local implementation details in this scope.
- L214: `entityId: uuid("entity_id"),` - Contributes to the local implementation details in this scope.
- L215: `actorId: uuid("actor_id"),` - Contributes to the local implementation details in this scope.
- L216: `payload: jsonb("payload").$type<Record<string, unknown> | null>(),` - Contributes to the local implementation details in this scope.
- L217: `createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),` - Contributes to the local implementation details in this scope.
- L218: `},` - Contributes to the local implementation details in this scope.
- L219: `(table) => ({` - Contributes to the local implementation details in this scope.
- L220: `tenantTypeIdx: index("idx_events_tenant_type").on(table.tenantId, table.eventType),` - Contributes to the local implementation details in this scope.
- L221: `entityIdx: index("idx_events_entity").on(table.entityType, table.entityId),` - Contributes to the local implementation details in this scope.
- L222: `}),` - Contributes to the local implementation details in this scope.
- L223: `);` - Contributes to the local implementation details in this scope.
- L225: `export const deadLetterItems = pgTable(` - Declares a constant used to hold configuration, state, or helper logic in this scope.
- L226: `"dead_letter_items",` - Contributes to the local implementation details in this scope.
- L227: `{` - Contributes to the local implementation details in this scope.
- L228: `id: uuid("id").defaultRandom().primaryKey(),` - Contributes to the local implementation details in this scope.
- L229: `runId: uuid("run_id").references(() => workflowRuns.id),` - Contributes to the local implementation details in this scope.
- L230: `stepLogId: uuid("step_log_id").references(() => stepLogs.id),` - Contributes to the local implementation details in this scope.
- L231: `queueName: varchar("queue_name", { length: 100 }),` - Contributes to the local implementation details in this scope.
- L232: `jobData: jsonb("job_data").$type<Record<string, unknown>>().notNull(),` - Contributes to the local implementation details in this scope.
- L233: `error: text("error"),` - Contributes to the local implementation details in this scope.
- L234: `failureCount: integer("failure_count"),` - Contributes to the local implementation details in this scope.
- L235: `status: varchar("status", { length: 50 }).default("pending").notNull(),` - Contributes to the local implementation details in this scope.
- L236: `resolvedAt: timestamp("resolved_at", { withTimezone: true }),` - Contributes to the local implementation details in this scope.
- L237: `resolvedBy: uuid("resolved_by").references(() => users.id),` - Contributes to the local implementation details in this scope.
- L238: `createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),` - Contributes to the local implementation details in this scope.
- L239: `},` - Contributes to the local implementation details in this scope.
- L240: `(table) => ({` - Contributes to the local implementation details in this scope.
- L241: `statusIdx: index("idx_dead_letter_status").on(table.status),` - Contributes to the local implementation details in this scope.
- L242: `}),` - Contributes to the local implementation details in this scope.
- L243: `);` - Contributes to the local implementation details in this scope.
- L245: `export const authAccounts = pgTable(` - Declares a constant used to hold configuration, state, or helper logic in this scope.
- L246: `"auth_accounts",` - Contributes to the local implementation details in this scope.
- L247: `{` - Contributes to the local implementation details in this scope.
- L248: `userId: uuid("user_id")` - Contributes to the local implementation details in this scope.
- L249: `.notNull()` - Contributes to the local implementation details in this scope.
- L250: `.references(() => users.id, { onDelete: "cascade" }),` - Contributes to the local implementation details in this scope.
- L251: `type: varchar("type", { length: 255 }).notNull(),` - Contributes to the local implementation details in this scope.
- L252: `provider: varchar("provider", { length: 255 }).notNull(),` - Contributes to the local implementation details in this scope.
- L253: `providerAccountId: varchar("provider_account_id", { length: 255 }).notNull(),` - Contributes to the local implementation details in this scope.
- L254: `refresh_token: text("refresh_token"),` - Contributes to the local implementation details in this scope.
- L255: `access_token: text("access_token"),` - Contributes to the local implementation details in this scope.
- L256: `expires_at: integer("expires_at"),` - Contributes to the local implementation details in this scope.
- L257: `token_type: varchar("token_type", { length: 255 }),` - Contributes to the local implementation details in this scope.
- L258: `scope: varchar("scope", { length: 255 }),` - Contributes to the local implementation details in this scope.
- L259: `id_token: text("id_token"),` - Contributes to the local implementation details in this scope.
- L260: `session_state: varchar("session_state", { length: 255 }),` - Contributes to the local implementation details in this scope.
- L261: `},` - Contributes to the local implementation details in this scope.
- L262: `(table) => ({` - Contributes to the local implementation details in this scope.
- L263: `pk: primaryKey({ columns: [table.provider, table.providerAccountId] }),` - Contributes to the local implementation details in this scope.
- L264: `}),` - Contributes to the local implementation details in this scope.
- L265: `);` - Contributes to the local implementation details in this scope.
- L267: `export const authSessions = pgTable("auth_sessions", {` - Declares a constant used to hold configuration, state, or helper logic in this scope.
- L268: `sessionToken: varchar("session_token", { length: 255 }).primaryKey(),` - Contributes to the local implementation details in this scope.
- L269: `userId: uuid("user_id")` - Contributes to the local implementation details in this scope.
- L270: `.notNull()` - Contributes to the local implementation details in this scope.
- L271: `.references(() => users.id, { onDelete: "cascade" }),` - Contributes to the local implementation details in this scope.
- L272: `expires: timestamp("expires", { withTimezone: true }).notNull(),` - Contributes to the local implementation details in this scope.
- L273: `});` - Contributes to the local implementation details in this scope.
- L275: `export const authVerificationTokens = pgTable(` - Declares a constant used to hold configuration, state, or helper logic in this scope.
- L276: `"auth_verification_tokens",` - Contributes to the local implementation details in this scope.
- L277: `{` - Contributes to the local implementation details in this scope.
- L278: `identifier: varchar("identifier", { length: 255 }).notNull(),` - Contributes to the local implementation details in this scope.
- L279: `token: varchar("token", { length: 255 }).notNull(),` - Contributes to the local implementation details in this scope.
- L280: `expires: timestamp("expires", { withTimezone: true }).notNull(),` - Contributes to the local implementation details in this scope.
- L281: `},` - Contributes to the local implementation details in this scope.
- L282: `(table) => ({` - Contributes to the local implementation details in this scope.
- L283: `pk: primaryKey({ columns: [table.identifier, table.token] }),` - Contributes to the local implementation details in this scope.
- L284: `}),` - Contributes to the local implementation details in this scope.
- L285: `);` - Contributes to the local implementation details in this scope.
- L287: `export type User = typeof users.$inferSelect;` - Defines a TypeScript type alias used to make data contracts explicit.
- L288: `export type Tenant = typeof tenants.$inferSelect;` - Defines a TypeScript type alias used to make data contracts explicit.
- L289: `export type Workflow = typeof workflows.$inferSelect;` - Defines a TypeScript type alias used to make data contracts explicit.
- L290: `export type WorkflowStep = typeof workflowSteps.$inferSelect;` - Defines a TypeScript type alias used to make data contracts explicit.
- L291: `export type WorkflowRun = typeof workflowRuns.$inferSelect;` - Defines a TypeScript type alias used to make data contracts explicit.

### State management
This file is mostly stateless. Most values are local constants or function parameters.

### Scope and closures
Scope is straightforward: module-level constants and function-local variables with no tricky closure behavior.

### Control flow
Control flow is mostly linear: input comes in, transformations run, and a value is returned.

### Side effects
No major external side effects; this file mostly shapes data or UI.

### TypeScript types and contracts
- L66: Generic type parameter constrains data shape.
- L87: Generic type parameter constrains data shape.
- L88: Generic type parameter constrains data shape.
- L91: Generic type parameter constrains data shape.
- L96: Generic type parameter constrains data shape.
- L115: Generic type parameter constrains data shape.
- L123: Generic type parameter constrains data shape.
- L145: Generic type parameter constrains data shape.
- L146: Generic type parameter constrains data shape.
- L181: Generic type parameter constrains data shape.

## Concepts taught by this file
- database modeling with ORM
- background job processing
- idempotency
- webhook signature security
- TypeScript type contracts
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
- background job processing: search for "background workers and job queues Node.js"
- idempotency: search for "API idempotency keys explained"
- webhook signature security: search for "HMAC webhook signature verification"
- TypeScript type contracts: search for "TypeScript interfaces vs types"
- configuration as code: search for "Twelve-Factor App config"
