import { db } from "@/db";
import { users } from "@/db/db-schema";
import { authInputValidator } from "@/services/auth/utils/authInputValidator";
import { compare } from "bcryptjs";
import { eq } from "drizzle-orm";
import { hashPassword } from "./utils/hashPassword";

export async function createUser(
  email: string,
  name: string,
  password: string,
) {
  if (!authInputValidator.validateEmail(email)) {
    throw new Error("Invalid email address");
  }
  if (!authInputValidator.validateName(name)) {
    throw new Error("Name must be at least 2 characters");
  }

  const passwordErrors = authInputValidator.validatePassword(password);
  if (passwordErrors.length > 0) {
    throw new Error(JSON.stringify(passwordErrors));
  }

  const hashedPassword = await hashPassword(password);

  try {
    const [user] = await db.transaction(async (tx) => {
      const existingUser = await tx.query.users.findFirst({
        where: eq(users.email, email),
      });
      if (existingUser) {
        throw new Error("User with this email already exists");
      }

      return tx
        .insert(users)
        .values({
          email,
          name,
          hashedPassword,
          permissions: {},
        })
        .returning();
    });

    return user;
  } catch (error) {
    throw new Error(
      error instanceof Error ? error.message : "Failed to create user",
    );
  }
}

export async function findUserByEmail(email: string) {
  if (!authInputValidator.validateEmail(email)) return null;
  return db.query.users.findFirst({ where: eq(users.email, email) });
}

export async function verifyPassword(password: string, hashedPassword: string) {
  if (!password || !hashedPassword) return false;
  return compare(password, hashedPassword);
}

export async function manageUserFromOAuth({
  email,
  name,
}: {
  email: string;
  name: string;
}) {
  const user = await db.transaction(async (tx) => {
    const existing = await tx
      .select()
      .from(users)
      .where(eq(users.email, email))
      .limit(1);

    if (existing[0]) return existing[0];

    const [newUser] = await tx
      .insert(users)
      .values({
        email,
        name,
        permissions: {},
      })
      .returning();

    return newUser;
  });

  if (!user) throw new Error("User creation failed");

  // Remove sensitive fields
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { hashedPassword, createdAt, updatedAt, ...safeUser } = user;
  return safeUser;
}
