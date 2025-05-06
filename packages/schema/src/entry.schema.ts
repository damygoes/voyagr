import { z } from "zod";
import { locationSchema } from "./location.schema";

export const entrySchema = z.object({
  entry_id: z.string().uuid(),
  user_id: z.string().uuid(),
  title: z.string().min(1),
  description: z.string().optional(),
  location: locationSchema,
  date: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: "Invalid date format",
  }),
  created_at: z
    .string()
    .refine((val) => !isNaN(Date.parse(val)), { message: "Invalid ISO date" }),
});

export type EntrySchema = z.infer<typeof entrySchema>;
