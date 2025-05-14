import express from "express";
import { createItemsRouter } from "./api/items/router";
import { createPingRouter } from "./api/ping/router";
import { db } from "./db";

export function createApp() {
  const app = express();

  app.use(express.json());

  app.use("/items", createItemsRouter(db));

  app.use("/ping", createPingRouter());

  app.use((req, res) => {
    res.status(404).json({ error: "Not found" });
  });

  return app;
}
