import { Request, Response } from "express";
import { getItems } from "./service";

export function getAllItems(db: any) {
  return async (_req: Request, res: Response) => {
    const items = await getItems(db);
    res.json(items);
  };
}
