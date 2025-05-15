import { Router } from "express";
import type { NodePgDatabase } from "drizzle-orm/node-postgres";
import { schema } from "@/db/schema";
import { createItem, deleteItem, getItems } from "./controller";

export function createItemsRouter(db: NodePgDatabase<typeof schema>) {
  const router = Router();
  router.get("/", getItems(db));
  router.post("/", createItem(db));
  router.delete("/", deleteItem(db));

  return router;
}
