import { Request, Response, NextFunction } from "express";
import { eq } from "drizzle-orm";
import type { NodePgDatabase } from "drizzle-orm/node-postgres";
import { items, schema } from "@/db/schema";
import { itemValidation } from "./validation";

export function getItems(db: NodePgDatabase<typeof schema>) {
  return async (_req: Request, res: Response) => {
    const allItems = await db.select().from(items);
    res.json(allItems);
  };
}

export function createItem(db: NodePgDatabase<typeof schema>) {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const parsed = itemValidation.parse(req.body);
      const [createdItem] = await db.insert(items).values(parsed).returning();
      res.status(201).json(createdItem);
    } catch (err) {
      next(err);
    }
  };
}

export function deleteItem(db: NodePgDatabase<typeof schema>) {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.body;
      if (!id) {
        res.status(400).json({ message: "ID is required" });
        return;
      }
      const deletedItem = await db.delete(items).where(eq(items.id, id));
      if (deletedItem.rowCount === 0) {
        res.status(404).json({ message: "Item not found" });
        return;
      }
      res.status(204).send();
    } catch (err) {
      next(err);
    }
  };
}
