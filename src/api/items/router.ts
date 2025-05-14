import { Router } from "express";
import { getAllItems } from "./controller";

export function createItemsRouter(db: any) {
  const router = Router();

  router.get("/", getAllItems(db));

  return router;
}
