import { eq } from "drizzle-orm";
import { auth } from "@/auth";
import { db } from "@/lib/db";
import { tenantMembers } from "@/lib/db/schema";
import { FlowPilotError } from "@/lib/utils/errors";

export interface TenantContext {
  userId: string;
  tenantId: string;
}

export async function requireTenantContext(): Promise<TenantContext> {
  const session = await auth();
  const userId = session?.user?.id;

  if (!userId) {
    throw new FlowPilotError("Unauthorized", "UNAUTHORIZED");
  }

  const member = await db.query.tenantMembers.findFirst({
    where: eq(tenantMembers.userId, userId),
  });

  if (!member) {
    throw new FlowPilotError("Tenant membership not found", "TENANT_NOT_FOUND");
  }

  return {
    userId,
    tenantId: member.tenantId,
  };
}
