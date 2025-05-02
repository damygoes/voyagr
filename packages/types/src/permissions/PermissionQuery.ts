import { EntryId } from "../entry/Entry";
import { UserId } from "../user/User";

export interface PermissionQuery {
  entry_id: EntryId; // Entry ID to check
  user_id: UserId; // User ID to check permissions for
}
