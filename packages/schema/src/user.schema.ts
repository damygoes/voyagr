import { z } from "zod";
import { permissionSchema } from "./permission.schema";

export const userIdSchema = z.string().uuid();

export const userPermissionsSchema = z.record(
  z.string().uuid(),
  z.array(permissionSchema),
);

export const userSchema = z.object({
  id: userIdSchema,
  email: z.string().email(),
  name: z.string().min(1),
  permissions: userPermissionsSchema,
});

export type UserSchema = z.infer<typeof userSchema>;
