import { z } from "zod";
import { userIdSchema } from "./user.schema";

export const authPayloadSchema = z.object({
  sub: userIdSchema,
  email: z.string().email(),
});
