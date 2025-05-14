import request from "supertest";
import express from "express";
import { pingRouter } from "../src/routes/ping";

let app: express.Express;

beforeAll(async () => {
  app = express();
  app.use(express.json());
  app.use("/ping", pingRouter);
});

test("get /ping returns 'pong'", async () => {
  const result = await request(app).get("/ping");
  expect(result.status).toBe(200);
  expect(result.body.message).toBe("pong");
});
