import { PermissionId } from "../permissions/Permission";
import { PermissionType } from "../permissions/PermissionType";
import { UserId } from "../user/User";
import { EntryId } from "./Entry";

export interface EntryPermissions {
  permission_id: PermissionId;
  entry_id: EntryId;
  user_id: UserId; // User who has been granted the permission
  permission_type: PermissionType;
  granted_by: UserId; // User who granted the permission
  granted_at: string;
}
