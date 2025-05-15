import { z } from "zod";

export const itemValidation = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().optional(),
  quantity: z.number().int().nonnegative(),
});
