import { Router } from "express";
import { items } from "../db/schema";

// @ts-ignore
export function createItemsRouter(db) {
  const itemsRouter = Router();

  itemsRouter.get("/", async (req, res) => {
    const allItems = await db.select().from(items);
    res.json(allItems);
  });

  return itemsRouter;
}
