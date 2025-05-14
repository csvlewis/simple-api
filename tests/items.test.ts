import request from "supertest";
import express from "express";
import { testDb } from "../src/lib/testDb";
import { createItemsRouter } from "../src/routes/items";

let app: express.Express;

beforeAll(async () => {
  app = express();
  app.use(express.json());
  app.use("/items", createItemsRouter(testDb));

  await testDb.schema
    .createTable("items")
    .addColumn("id", "integer", (col) => col.primaryKey().autoIncrement())
    .addColumn("name", "text")
    .addColumn("quantity", "integer")
    .execute();
});

afterEach(async () => {
  await testDb.deleteFrom("items").execute();
});

afterAll(async () => {
  await testDb.destroy();
});

test("GET /items returns all items", async () => {
  await testDb
    .insertInto("items")
    .values([
      { name: "Bolt", quantity: 10 },
      { name: "Nut", quantity: 20 },
    ])
    .execute();
  const res = await request(app).get("/items");
  expect(res.status).toBe(200);
  expect(res.body.length).toBe(2);
  expect(res.body[0].id).toBe(1);
  expect(res.body[0].name).toBe("Bolt");
  expect(res.body[0].quantity).toBe(10);
  expect(res.body[1].id).toBe(2);
  expect(res.body[1].name).toBe("Nut");
  expect(res.body[1].quantity).toBe(20);
});
