import { findUserByEmail, verifyPassword } from "@/services/auth/auth.service";
import { SafeUser } from "@voyagr/types/src/user/User";

export async function verifyUserCredentials(
  email: string,
  password: string,
): Promise<SafeUser> {
  const user = await findUserByEmail(email);

  // Always perform password verification to prevent timing attacks
  const isValidPassword = user?.hashedPassword
    ? await verifyPassword(password, user.hashedPassword)
    : false;

  if (!user || !user.hashedPassword || !isValidPassword) {
    throw new Error("Invalid credentials");
  }

  // Remove sensitive info
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { hashedPassword, ...safeUser } = user;
  return safeUser as SafeUser;
}
