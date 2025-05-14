import { items } from "../../db/schema";

export async function getItems(db: any) {
  return db.select().from(items);
}
