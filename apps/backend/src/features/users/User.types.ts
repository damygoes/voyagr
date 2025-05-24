import { User } from "@voyagr/types/src/user/User";

export interface UserWithPassword extends User {
  hashedPassword: string | null;
  createdAt: string;
  updatedAt: string;
}

export type SafeUser = Omit<
  UserWithPassword,
  "hashedPassword" | "createdAt" | "updatedAt"
>;
