import { sql } from "drizzle-orm";
import {
  bigserial,
  boolean,
  index,
  integer,
  jsonb,
  pgTable,
  primaryKey,
  text,
  timestamp,
  unique,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: uuid("id").defaultRandom().primaryKey(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  passwordHash: varchar("password_hash", { length: 255 }),
  name: varchar("name", { length: 255 }),
  avatarUrl: text("avatar_url"),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
});

export const tenants = pgTable("tenants", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  slug: varchar("slug", { length: 100 }).notNull().unique(),
  plan: varchar("plan", { length: 50 }).default("free").notNull(),
  maxConcurrency: integer("max_concurrency").default(5).notNull(),
  maxWorkflows: integer("max_workflows").default(10).notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
});

export const tenantMembers = pgTable(
  "tenant_members",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    tenantId: uuid("tenant_id")
      .notNull()
      .references(() => tenants.id, { onDelete: "cascade" }),
    userId: uuid("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    role: varchar("role", { length: 50 }).default("member").notNull(),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  },
  (table) => ({
    tenantUserUnique: unique("tenant_members_tenant_user_unique").on(table.tenantId, table.userId),
  }),
);

export const workflows = pgTable(
  "workflows",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    tenantId: uuid("tenant_id")
      .notNull()
      .references(() => tenants.id, { onDelete: "cascade" }),
    createdBy: uuid("created_by").references(() => users.id),
    name: varchar("name", { length: 255 }).notNull(),
    description: text("description"),
    triggerType: varchar("trigger_type", { length: 50 }).notNull(),
    triggerConfig: jsonb("trigger_config").$type<Record<string, unknown>>().default(sql`'{}'::jsonb`).notNull(),
    isActive: boolean("is_active").default(true).notNull(),
    version: integer("version").default(1).notNull(),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
  },
  (table) => ({
    tenantIdx: index("idx_workflows_tenant").on(table.tenantId),
  }),
);

export const workflowSteps = pgTable(
  "workflow_steps",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    workflowId: uuid("workflow_id")
      .notNull()
      .references(() => workflows.id, { onDelete: "cascade" }),
    stepType: varchar("step_type", { length: 50 }).notNull(),
    name: varchar("name", { length: 255 }).notNull(),
    position: integer("position").notNull(),
    config: jsonb("config").$type<Record<string, unknown>>().notNull(),
    inputMapping: jsonb("input_mapping").$type<Record<string, unknown>>().default(sql`'{}'::jsonb`).notNull(),
    timeoutMs: integer("timeout_ms").default(30000).notNull(),
    retryConfig: jsonb("retry_config")
      .$type<Record<string, unknown>>()
      .default(sql`'{"maxRetries":3,"backoffMs":1000,"backoffMultiplier":2}'::jsonb`)
      .notNull(),
    onFailure: varchar("on_failure", { length: 50 }).default("stop").notNull(),
    nextStepId: uuid("next_step_id"),
    conditionBranches: jsonb("condition_branches").$type<Array<Record<string, unknown>> | null>(),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  },
  (table) => ({
    workflowPositionIdx: index("idx_steps_workflow").on(table.workflowId, table.position),
  }),
);

export const workflowRuns = pgTable(
  "workflow_runs",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    workflowId: uuid("workflow_id")
      .notNull()
      .references(() => workflows.id, { onDelete: "cascade" }),
    tenantId: uuid("tenant_id")
      .notNull()
      .references(() => tenants.id),
    triggeredBy: varchar("triggered_by", { length: 50 }).notNull(),
    triggerData: jsonb("trigger_data").$type<Record<string, unknown>>().default(sql`'{}'::jsonb`).notNull(),
    idempotencyKey: varchar("idempotency_key", { length: 255 }),
    status: varchar("status", { length: 50 }).default("pending").notNull(),
    startedAt: timestamp("started_at", { withTimezone: true }),
    completedAt: timestamp("completed_at", { withTimezone: true }),
    durationMs: integer("duration_ms"),
    error: text("error"),
    workflowVersion: integer("workflow_version"),
    contextData: jsonb("context_data").$type<Record<string, unknown>>().default(sql`'{}'::jsonb`).notNull(),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  },
  (table) => ({
    workflowIdx: index("idx_runs_workflow").on(table.workflowId),
    tenantStatusIdx: index("idx_runs_tenant_status").on(table.tenantId, table.status),
    idempotencyIdx: index("idx_runs_idempotency").on(table.idempotencyKey).where(sql`${table.idempotencyKey} is not null`),
  }),
);

export const stepLogs = pgTable(
  "step_logs",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    runId: uuid("run_id")
      .notNull()
      .references(() => workflowRuns.id, { onDelete: "cascade" }),
    stepId: uuid("step_id").references(() => workflowSteps.id),
    stepName: varchar("step_name", { length: 255 }),
    stepType: varchar("step_type", { length: 50 }),
    status: varchar("status", { length: 50 }).default("pending").notNull(),
    attempt: integer("attempt").default(1).notNull(),
    inputData: jsonb("input_data").$type<Record<string, unknown> | null>(),
    outputData: jsonb("output_data").$type<Record<string, unknown> | null>(),
    error: text("error"),
    errorCode: varchar("error_code", { length: 100 }),
    startedAt: timestamp("started_at", { withTimezone: true }),
    completedAt: timestamp("completed_at", { withTimezone: true }),
    durationMs: integer("duration_ms"),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  },
  (table) => ({
    runIdx: index("idx_step_logs_run").on(table.runId),
    stepIdx: index("idx_step_logs_step").on(table.stepId),
  }),
);

export const webhookEndpoints = pgTable("webhook_endpoints", {
  id: uuid("id").defaultRandom().primaryKey(),
  tenantId: uuid("tenant_id")
    .notNull()
    .references(() => tenants.id, { onDelete: "cascade" }),
  workflowId: uuid("workflow_id")
    .notNull()
    .references(() => workflows.id, { onDelete: "cascade" }),
  path: varchar("path", { length: 255 }).notNull().unique(),
  signingSecret: varchar("signing_secret", { length: 255 }).notNull(),
  isActive: boolean("is_active").default(true).notNull(),
  lastTriggered: timestamp("last_triggered", { withTimezone: true }),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
});

export const webhookDeliveries = pgTable("webhook_deliveries", {
  id: uuid("id").defaultRandom().primaryKey(),
  runId: uuid("run_id").references(() => workflowRuns.id),
  stepLogId: uuid("step_log_id").references(() => stepLogs.id),
  url: text("url").notNull(),
  method: varchar("method", { length: 10 }).default("POST").notNull(),
  headers: jsonb("headers").$type<Record<string, string> | null>(),
  requestBody: jsonb("request_body").$type<Record<string, unknown> | null>(),
  responseStatus: integer("response_status"),
  responseBody: text("response_body"),
  signature: varchar("signature", { length: 255 }),
  attempt: integer("attempt").default(1).notNull(),
  status: varchar("status", { length: 50 }),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
});

export const idempotencyKeys = pgTable(
  "idempotency_keys",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    key: varchar("key", { length: 255 }).notNull(),
    tenantId: uuid("tenant_id").references(() => tenants.id),
    runId: uuid("run_id").references(() => workflowRuns.id),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
    expiresAt: timestamp("expires_at", { withTimezone: true }).notNull(),
  },
  (table) => ({
    tenantKeyUnique: unique("idempotency_keys_key_tenant_unique").on(table.key, table.tenantId),
    expiresIdx: index("idx_idempotency_expires").on(table.expiresAt),
  }),
);

export const eventLog = pgTable(
  "event_log",
  {
    id: bigserial("id", { mode: "number" }).primaryKey(),
    tenantId: uuid("tenant_id").references(() => tenants.id),
    eventType: varchar("event_type", { length: 100 }).notNull(),
    entityType: varchar("entity_type", { length: 50 }),
    entityId: uuid("entity_id"),
    actorId: uuid("actor_id"),
    payload: jsonb("payload").$type<Record<string, unknown> | null>(),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  },
  (table) => ({
    tenantTypeIdx: index("idx_events_tenant_type").on(table.tenantId, table.eventType),
    entityIdx: index("idx_events_entity").on(table.entityType, table.entityId),
  }),
);

export const deadLetterItems = pgTable(
  "dead_letter_items",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    runId: uuid("run_id").references(() => workflowRuns.id),
    stepLogId: uuid("step_log_id").references(() => stepLogs.id),
    queueName: varchar("queue_name", { length: 100 }),
    jobData: jsonb("job_data").$type<Record<string, unknown>>().notNull(),
    error: text("error"),
    failureCount: integer("failure_count"),
    status: varchar("status", { length: 50 }).default("pending").notNull(),
    resolvedAt: timestamp("resolved_at", { withTimezone: true }),
    resolvedBy: uuid("resolved_by").references(() => users.id),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  },
  (table) => ({
    statusIdx: index("idx_dead_letter_status").on(table.status),
  }),
);

export const authAccounts = pgTable(
  "auth_accounts",
  {
    userId: uuid("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    type: varchar("type", { length: 255 }).notNull(),
    provider: varchar("provider", { length: 255 }).notNull(),
    providerAccountId: varchar("provider_account_id", { length: 255 }).notNull(),
    refresh_token: text("refresh_token"),
    access_token: text("access_token"),
    expires_at: integer("expires_at"),
    token_type: varchar("token_type", { length: 255 }),
    scope: varchar("scope", { length: 255 }),
    id_token: text("id_token"),
    session_state: varchar("session_state", { length: 255 }),
  },
  (table) => ({
    pk: primaryKey({ columns: [table.provider, table.providerAccountId] }),
  }),
);

export const authSessions = pgTable("auth_sessions", {
  sessionToken: varchar("session_token", { length: 255 }).primaryKey(),
  userId: uuid("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  expires: timestamp("expires", { withTimezone: true }).notNull(),
});

export const authVerificationTokens = pgTable(
  "auth_verification_tokens",
  {
    identifier: varchar("identifier", { length: 255 }).notNull(),
    token: varchar("token", { length: 255 }).notNull(),
    expires: timestamp("expires", { withTimezone: true }).notNull(),
  },
  (table) => ({
    pk: primaryKey({ columns: [table.identifier, table.token] }),
  }),
);

export type User = typeof users.$inferSelect;
export type Tenant = typeof tenants.$inferSelect;
export type Workflow = typeof workflows.$inferSelect;
export type WorkflowStep = typeof workflowSteps.$inferSelect;
export type WorkflowRun = typeof workflowRuns.$inferSelect;
