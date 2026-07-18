import { db } from "@/lib/db";
import { sql } from "drizzle-orm";

export async function checkWorkerHealth() {
  await db.execute(sql`select 1`);
  return {
    ok: true,
    timestamp: new Date().toISOString(),
  };
}
