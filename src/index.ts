import express from "express";
import { pingRouter } from "./routes/ping";
import { createItemsRouter } from "./routes/items";
import { db, initDb } from "./lib/db";

const app = express();
app.use(express.json());

app.use("/ping", pingRouter);

app.use("/items", createItemsRouter(db));

initDb();

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
