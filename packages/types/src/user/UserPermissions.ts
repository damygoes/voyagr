import { EntryId } from "../entry/Entry";
import { Permission } from "../permissions/Permission";

export interface UserPermissions {
  [entry_id: EntryId]: Permission[]; // Entry IDs mapped to an array of permissions
}
