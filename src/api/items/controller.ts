import { Request, Response } from "express";
import * as ItemService from "./service";

export function getAllItems(db: any) {
  return async (_req: Request, res: Response) => {
    const items = await ItemService.getItems(db);
    res.json(items);
  };
}
