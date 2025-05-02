import { z } from "zod";

export const permissionTypeEnum = z.enum(["view", "write", "delete"]);

export const permissionSchema = z.object({
  entry_id: z.string().uuid(),
  user_id: z.string().uuid(),
  permission_type: permissionTypeEnum,
  granted_at: z.string().datetime(),
});

export const permissionAssignmentSchema = z.object({
  entry_id: z.string().uuid(),
  user_id: z.string().uuid(),
  permission_type: permissionTypeEnum,
  granted_by: z.string().uuid(),
  granted_at: z.string().datetime(),
});

export const permissionQuerySchema = z.object({
  entry_id: z.string().uuid(),
  user_id: z.string().uuid(),
});

export type PermissionSchema = z.infer<typeof permissionSchema>;

export type PermissionAssignmentSchema = z.infer<
  typeof permissionAssignmentSchema
>;
