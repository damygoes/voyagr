import { UserPermissions } from "./UserPermissions";

export type UserId = string;

export interface User {
  id: UserId;
  email: string;
  createdAt: string; // ISO 8601 format
  updatedAt: string; // ISO 8601 format
  permissions: UserPermissions;
  name?: string | null;
}

export interface UserWithPassword extends User {
  hashedPassword: string | null;
  createdAt: string;
  updatedAt: string;
}

export type SafeUser = Omit<
  UserWithPassword,
  "hashedPassword" | "createdAt" | "updatedAt"
>;

export interface SafeUserWithToken extends SafeUser {
  token: string;
}
