import { Location } from "../Location";
import { UserId } from "../user/User";

export type EntryId = string;

export interface Entry {
  entry_id: EntryId;
  user_id: UserId;
  title: string;
  description: string;
  location: Location;
  date: string;
  created_at: string;
}
