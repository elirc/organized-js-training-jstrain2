import { eq } from "drizzle-orm";
import { NextRequest } from "next/server";
import { db } from "@/lib/db";
import { deadLetterItems } from "@/lib/db/schema";
import { requireTenantContext } from "@/lib/auth/tenant";
import { fromError, ok } from "@/lib/utils/api";

export async function POST(_request: NextRequest, { params }: { params: { id: string } }) {
  try {
    await requireTenantContext();

    const [updated] = await db
      .update(deadLetterItems)
      .set({
        status: "discarded",
        resolvedAt: new Date(),
      })
      .where(eq(deadLetterItems.id, params.id))
      .returning();

    return ok(updated ?? null);
  } catch (error: unknown) {
    return fromError(error);
  }
}
