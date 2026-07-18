import { z } from "zod";

export const httpRequestConfigSchema = z.object({
  url: z.string().url(),
  method: z.enum(["GET", "POST", "PUT", "PATCH", "DELETE"]).default("POST"),
  headers: z.record(z.string()).default({}),
  body: z.record(z.unknown()).optional(),
  expectedStatus: z.number().int().min(100).max(599).optional(),
});

export const transformConfigSchema = z.object({
  code: z.string().min(1),
});

export const conditionConfigSchema = z.object({
  expression: z.string().min(1),
  branches: z
    .array(
      z.object({
        condition: z.string().min(1),
        nextStepId: z.string().uuid(),
      }),
    )
    .default([]),
});

export const delayConfigSchema = z.object({
  delayMs: z.number().int().min(1).max(86400000),
});

export const webhookSendConfigSchema = z.object({
  url: z.string().url(),
  method: z.enum(["POST", "PUT", "PATCH"]).default("POST"),
  headers: z.record(z.string()).default({}),
  signingSecret: z.string().min(8),
});

export const loopConfigSchema = z.object({
  arrayPath: z.string().min(1),
  subSteps: z.array(z.record(z.unknown())).default([]),
});
