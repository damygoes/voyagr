export const PermissionTypeEnum = {
  VIEW: "view",
  WRITE: "write",
  DELETE: "delete",
} as const;

export type PermissionType =
  (typeof PermissionTypeEnum)[keyof typeof PermissionTypeEnum];
