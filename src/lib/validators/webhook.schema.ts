import { z } from "zod";

export const webhookEndpointCreateSchema = z.object({
  workflowId: z.string().uuid(),
  path: z.string().min(3).max(255),
  signingSecret: z.string().min(8).max(255),
  isActive: z.boolean().default(true),
});

export const webhookIncomingHeaderSchema = z.object({
  signature: z.string().min(1),
  idempotencyKey: z.string().max(255).optional(),
});
