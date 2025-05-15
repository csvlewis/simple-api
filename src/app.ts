import express from "express";
import type { ErrorRequestHandler } from "express";
import { errorHandler } from "./middleware/errorHandler";
import { createItemsRouter } from "./api/items/router";
import { createPingRouter } from "./api/ping/router";
import { db } from "./db";

export function createApp() {
  const app = express();

  app.use(express.json());

  app.use("/items", createItemsRouter(db));

  app.use("/ping", createPingRouter());

  app.use(errorHandler as ErrorRequestHandler);

  return app;
}
