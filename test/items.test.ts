import request from "supertest";
import express from "express";
import type { ErrorRequestHandler } from "express";
import { sql } from "drizzle-orm";
import { migrate } from "drizzle-orm/node-postgres/migrator";
import { items } from "@/db/schema";
import { db, pool } from "@/db/test-db";
import { errorHandler } from "@/middleware/errorHandler";
import { createItemsRouter } from "@/api/items/router";

let app: express.Express;

beforeAll(async () => {
  app = express();
  app.use(express.json());
  app.use("/items", createItemsRouter(db));
  app.use(errorHandler as ErrorRequestHandler);
  await migrate(db, { migrationsFolder: "./migrations" });
});

afterEach(async () => {
  await db.execute(sql`DELETE FROM items;`);
});

afterAll(async () => {
  await pool.end();
});

describe("GET /items", () => {
  test("GET /items all items", async () => {
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

    const result = await request(app).get("/items");
    expect(result.status).toBe(200);
    expect(result.body.length).toBe(2);
    expect(typeof result.body[0].id).toBe("string");
    expect(result.body[0].id).toMatch(
      /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i
    );
    expect(result.body[0].name).toBe("Item 1");
    expect(result.body[0].description).toBe("Description 1");
    expect(result.body[0].quantity).toBe(10);
  });
});

describe("POST /items", () => {
  test("POST /items with valid data returns 201", async () => {
    const response = await request(app).post("/items").send({
      name: "Test Item",
      description: "Item Description",
      quantity: 10,
    });
    expect(response.status).toBe(201);
    expect(response.body.name).toBe("Test Item");
    expect(response.body.description).toBe("Item Description");
    expect(response.body.quantity).toBe(10);
  });
  test("POST /items with missing name returns 400", async () => {
    const response = await request(app)
      .post("/items")
      .send({ description: "Item Description", quantity: 10 });
    expect(response.status).toBe(400);
    expect(response.body.message).toBe("Input validation failed");
  });
});

describe("DELETE /items", () => {
  test("should delete an item and return 204", async () => {
    const [item] = await db
      .insert(items)
      .values({
        name: "Item to delete",
        description: "Description",
        quantity: 5,
      })
      .returning({ id: items.id });

    const response = await request(app).delete("/items").send({ id: item.id });

    expect(response.status).toBe(204);
  });

  test("should return 400 if ID is not provided", async () => {
    const response = await request(app).delete("/items").send({});

    expect(response.status).toBe(400);
    expect(response.body.message).toBe("ID is required");
  });

  test("should return 404 if item does not exist", async () => {
    const response = await request(app)
      .delete("/items")
      .send({ id: "f70dca23-a6ba-4da5-880a-9ef5be8bb79d" });

    expect(response.status).toBe(404);
    expect(response.body.message).toBe("Item not found");
  });
});
