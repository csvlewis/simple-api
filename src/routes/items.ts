import { Router } from "express";
import { Kysely } from "kysely";
import { Database as DB } from "../lib/db";

export function createItemsRouter(db: Kysely<DB>) {
  const router = Router();

  router.get("/", async (req, res) => {
    const items = await db.selectFrom("items").selectAll().execute();
    res.json(items);
  });

  return router;
}
