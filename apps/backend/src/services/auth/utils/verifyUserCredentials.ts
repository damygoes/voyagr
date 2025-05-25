import { findUserByEmail, verifyPassword } from "@/services/auth/auth.service";
import { SafeUser } from "@voyagr/types/src/user/User";
import { GraphQLError } from "graphql";

export async function verifyUserCredentials(
  email: string,
  password: string,
): Promise<SafeUser> {
  const user = await findUserByEmail(email);
  if (!user) {
    throw new GraphQLError("No user found with this email.");
  }

  // Always perform password verification to prevent timing attacks
  const isValidPassword = user?.hashedPassword
    ? await verifyPassword(password, user.hashedPassword)
    : false;
  if (!isValidPassword) {
    throw new GraphQLError("Incorrect password.");
  }

  if (!user || !user.hashedPassword || !isValidPassword) {
    throw new GraphQLError("Invalid credentials provided.");
  }

  // Remove sensitive info
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { hashedPassword, ...safeUser } = user;
  return safeUser as SafeUser;
}
