import { SafeUser } from "@voyagr/types/src/user/User";
import { manageUserFromOAuth } from "../auth.service";
import { authInputValidator } from "./authInputValidator";

export async function findOrCreateOAuthUser(
  email: string,
  name?: string,
): Promise<SafeUser> {
  if (!authInputValidator.validateEmail || !authInputValidator.validateName) {
    throw new Error("Email and name are required");
  }

  return manageUserFromOAuth({ email, name: name || "" });
}
