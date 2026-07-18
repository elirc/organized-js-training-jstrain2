import { and, desc, eq } from "drizzle-orm";
import { NextRequest } from "next/server";
import { db } from "@/lib/db";
import { deadLetterItems, workflowRuns } from "@/lib/db/schema";
import { requireTenantContext } from "@/lib/auth/tenant";
import { fromError, ok } from "@/lib/utils/api";

export async function GET(_request: NextRequest) {
  try {
    const { tenantId } = await requireTenantContext();

    const items = await db.query.deadLetterItems.findMany({
      where: and(eq(deadLetterItems.status, "pending")),
      orderBy: [desc(deadLetterItems.createdAt)],
      limit: 100,
    });

    const scoped = items.filter((item) => {
      if (!item.runId) {
        return false;
      }
      return true;
    });

    return ok({ tenantId, items: scoped });
  } catch (error: unknown) {
    return fromError(error);
  }
}
