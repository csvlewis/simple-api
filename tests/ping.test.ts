import request from "supertest";
import express from "express";
import { pingRouter } from "../src/routes/ping";

let app: express.Express;

beforeAll(async () => {
  app = express();
  app.use(express.json());
  app.use("/ping", pingRouter);
});

test("GET /ping returns 'pong'", async () => {
  const res = await request(app).get("/ping");
  expect(res.status).toBe(200);
  expect(res.body).toEqual({ message: "pong" });
});
