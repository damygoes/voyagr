import { SafeUser } from "@voyagr/types/src/user/User";
import { manageUserFromOAuth } from "../auth.service";

export async function findOrCreateOAuthUser(
  email: string,
  name?: string,
): Promise<SafeUser> {
  if (!email || !name) {
    throw new Error("Email and name are required");
  }

  return manageUserFromOAuth({ email, name });
}
