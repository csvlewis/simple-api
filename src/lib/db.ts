import { Generated, Kysely, PostgresDialect, sql } from "kysely";
import { Pool } from "pg";

type Item = {
  id: Generated<string>;
  name: string;
  quantity: number;
};

export type Database = {
  items: Item;
};

export const db = new Kysely<Database>({
  dialect: new PostgresDialect({
    pool: new Pool({
      database: "test",
      host: "localhost",
      user: "admin",
      port: 5432,
      max: 10,
    }),
  }),
});

export async function initDb() {
  console.log("Initializing database...");
  // await db.schema.dropTable("items").execute();
  await db.schema
    .createTable("items")
    .ifNotExists()
    .addColumn("id", "uuid", (col) =>
      col.primaryKey().defaultTo(sql`gen_random_uuid()`)
    )
    .addColumn("name", "text", (col) => col.notNull().unique())
    .addColumn("quantity", "integer", (col) => col.notNull())
    .execute();
}
