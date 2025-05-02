import { EntryId } from "../entry/Entry";
import { UserId } from "../user/User";
import { PermissionType } from "./PermissionType";

export type PermissionId = string;

export interface Permission {
  entry_id: EntryId;
  user_id: UserId; // User with permission
  permission_type: PermissionType;
  granted_at: string; // ISO 8601 format
}
