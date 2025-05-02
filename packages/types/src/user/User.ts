import { UserPermissions } from "./UserPermissions";

export type UserId = string;

export interface User {
  id: UserId;
  email: string;
  createdAt: string; // ISO 8601 format
  updatedAt: string; // ISO 8601 format
  permissions: UserPermissions;
}
