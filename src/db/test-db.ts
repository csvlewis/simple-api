import { drizzle } from "drizzle-orm/better-sqlite3";
import Database from "better-sqlite3";
import { schema } from "./test-schema";

const sqlite = new Database(":memory:");

export const db = drizzle(sqlite, { schema });
