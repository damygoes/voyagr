import { z } from "zod";

export const locationSchema = z.object({
  latitude: z.number(),
  longitude: z.number(),
  address: z.string().optional(),
  placeName: z.string().optional(),
});
