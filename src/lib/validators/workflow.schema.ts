import { z } from "zod";

const retryConfigSchema = z.object({
  maxRetries: z.number().int().min(0).max(10).default(3),
  backoffMs: z.number().int().min(100).max(60000).default(1000),
  backoffMultiplier: z.number().min(1).max(10).default(2),
});

export const stepInputSchema = z.object({
  id: z.string().uuid().optional(),
  stepType: z.enum(["http_request", "transform", "condition", "delay", "webhook_send", "loop"]),
  name: z.string().min(1).max(255),
  position: z.number().int().min(0),
  config: z.record(z.unknown()).default({}),
  inputMapping: z.record(z.unknown()).default({}),
  timeoutMs: z.number().int().min(100).max(300000).default(30000),
  retryConfig: retryConfigSchema.default({ maxRetries: 3, backoffMs: 1000, backoffMultiplier: 2 }),
  onFailure: z.string().default("stop"),
  nextStepId: z.string().uuid().nullable().optional(),
  conditionBranches: z
    .array(
      z.object({
        expression: z.string().min(1),
        nextStepId: z.string().uuid(),
      }),
    )
    .nullable()
    .optional(),
});

export const workflowCreateSchema = z.object({
  name: z.string().min(1).max(255),
  description: z.string().max(4000).nullable().optional(),
  triggerType: z.enum(["manual", "webhook", "schedule"]),
  triggerConfig: z.record(z.unknown()).default({}),
  isActive: z.boolean().default(true),
  steps: z.array(stepInputSchema).default([]),
});

export const workflowUpdateSchema = workflowCreateSchema.partial().extend({
  steps: z.array(stepInputSchema).optional(),
});

export const paginationSchema = z.object({
  cursor: z.string().uuid().optional(),
  limit: z.coerce.number().int().min(1).max(100).default(20),
});

export type WorkflowCreateInput = z.infer<typeof workflowCreateSchema>;
export type WorkflowUpdateInput = z.infer<typeof workflowUpdateSchema>;
export type StepInputSchema = z.infer<typeof stepInputSchema>;
