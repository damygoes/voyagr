import { UserId } from "../user/User";
import { UserPermissions } from "../user/UserPermissions";
import { ResourceId, ResourceType } from "./ResourceType";

export interface ShareableResource<T extends ResourceType = "entry"> {
  resource_id: ResourceId;
  resource_type: T;
  user_permissions: UserPermissions;
  shared_by: UserId;
  shared_at: string; // ISO 8601 format
}
