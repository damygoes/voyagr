import { UserId } from "./user/User";

export interface AuthPayload {
  sub: UserId;
  email: string;
}
