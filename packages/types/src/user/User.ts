import { UserPermissions } from "./UserPermissions";

export type UserId = string;

export interface User {
  id: UserId;
  email: string;
  name: string;
  permissions: UserPermissions;
}
