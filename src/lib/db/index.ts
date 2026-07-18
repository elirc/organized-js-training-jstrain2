import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import * as schema from "@/lib/db/schema";

const connectionString = process.env.DATABASE_URL;
const fallbackConnectionString = "postgresql://flowpilot:flowpilot_dev@localhost:5432/flowpilot";

export const pool = new Pool({
  connectionString: connectionString ?? fallbackConnectionString,
  max: 20,
});

export const db = drizzle(pool, { schema });
