import { EntryId } from "../entry/Entry";
import { UserId } from "../user/User";
import { PermissionType } from "./PermissionType";

export interface PermissionAssignment {
  entry_id: EntryId; // Entry being shared
  user_id: UserId; // User receiving permission
  permission_type: PermissionType; // The permission being granted (view, write, delete)
  granted_by: UserId; // The user granting the permission
  granted_at: string; // ISO 8601 format
}
