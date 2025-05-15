import { ZodError } from "zod";
import { Request, Response, NextFunction } from "express";

export function errorHandler(
  err: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction
) {
  if (err instanceof ZodError) {
    return res.status(400).json({
      message: "Input validation failed",
      errors: err.flatten(),
    });
  }
  console.error(err);
  res.status(500).json({ message: "Internal Server Error" });
}
