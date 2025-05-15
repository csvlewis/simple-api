import request from "supertest";
import express from "express";
import { createPingRouter } from "@/api/ping/router";

let app: express.Express;

beforeAll(async () => {
  app = express();
  app.use(express.json());
  app.use("/ping", createPingRouter());
});

test("GET invalid route returns 404", async () => {
  const result = await request(app).get("/invalid");
  expect(result.status).toBe(404);
});

test("get /ping returns 'pong'", async () => {
  const result = await request(app).get("/ping");
  expect(result.status).toBe(200);
  expect(result.body.message).toBe("pong");
});
