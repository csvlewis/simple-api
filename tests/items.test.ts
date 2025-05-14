import request from "supertest";
import express from "express";
import { items } from "../src/db/test-schema";
import { db } from "../src/db/test-db";
import { sql } from "drizzle-orm";
import { migrate } from "drizzle-orm/better-sqlite3/migrator";
import { createItemsRouter } from "../src/routes/items";

let app: express.Express;

beforeAll(async () => {
  app = express();
  app.use(express.json());
  app.use("/items", createItemsRouter(db));
  await migrate(db, { migrationsFolder: "./test-migrations" });
  await db.insert(items).values([
    {
      name: "Item 1",
      description: "Description 1",
      quantity: 10,
    },
    {
      name: "Item 2",
      description: "Description 2",
      quantity: 20,
    },
  ]);
});

afterEach(async () => {
  await db.run(sql`DELETE FROM items;`);
});

afterAll(() => {
  db.$client.close();
});

test("get /items returns all items", async () => {
  const result = await request(app).get("/items");
  expect(result.status).toBe(200);
  expect(result.body.length).toBe(2);
  expect(result.body[0].id).toBe(1);
  expect(result.body[0].name).toBe("Item 1");
  expect(result.body[0].description).toBe("Description 1");
  expect(result.body[0].quantity).toBe(10);
  expect(result.body[1].id).toBe(2);
  expect(result.body[1].name).toBe("Item 2");
  expect(result.body[1].description).toBe("Description 2");
  expect(result.body[1].quantity).toBe(20);
});
