import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import { schema } from "./schema";

const pool = new Pool({
  host: "localhost",
  port: 5432,
  user: "admin",
  database: "test",
});

export const db = drizzle(pool, { schema });
