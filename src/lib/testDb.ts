import { Kysely, SqliteDialect } from "kysely";
import Database from "better-sqlite3";
import { Database as DB } from "./db";

export const testDb = new Kysely<DB>({
  dialect: new SqliteDialect({
    database: new Database(":memory:"),
  }),
});
