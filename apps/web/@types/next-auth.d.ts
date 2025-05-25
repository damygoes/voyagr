import { UserPermissions } from "@voyagr/types/user-permissions";
import { DefaultSession, DefaultUser } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: DefaultSession["user"] & {
      id: string;
      permissions: UserPermissions;
      email: string;
      name?: string | null;
    };
    accessToken: string;
  }

  interface User extends DefaultUser {
    id: string;
    token: string;
    permissions: UserPermissions;
    email: string;
    name?: string | null;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    accessToken: string;
    email: string;
    name?: string | null;
    permissions: UserPermissions;
  }
}
