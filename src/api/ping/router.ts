import { Router } from "express";

export function createPingRouter() {
  const router = Router();

  router.get("/", (req, res) => {
    res.json({ message: "pong" });
  });
  return router;
}
