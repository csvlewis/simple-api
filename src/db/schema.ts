import { pgTable, uuid, text, integer } from "drizzle-orm/pg-core";

export const items = pgTable("items", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("name").notNull().unique(),
  description: text("description"),
  quantity: integer("quantity").notNull(),
});

export const schema = { items };
