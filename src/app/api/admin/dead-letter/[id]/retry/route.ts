import { and, eq } from "drizzle-orm";
import { NextRequest } from "next/server";
import { db } from "@/lib/db";
import { deadLetterItems } from "@/lib/db/schema";
import { workflowQueue } from "@/lib/queue/workflows.queue";
import { requireTenantContext } from "@/lib/auth/tenant";
import { fromError, ok } from "@/lib/utils/api";

export async function POST(_request: NextRequest, { params }: { params: { id: string } }) {
  try {
    await requireTenantContext();

    const item = await db.query.deadLetterItems.findFirst({
      where: and(eq(deadLetterItems.id, params.id), eq(deadLetterItems.status, "pending")),
    });

    if (!item) {
      return ok(null);
    }

    await workflowQueue.add(`dead-letter-retry-${item.id}`, item.jobData as Record<string, unknown>);

    const [updated] = await db
      .update(deadLetterItems)
      .set({
        status: "retried",
        resolvedAt: new Date(),
      })
      .where(eq(deadLetterItems.id, item.id))
      .returning();

    return ok(updated);
  } catch (error: unknown) {
    return fromError(error);
  }
}
