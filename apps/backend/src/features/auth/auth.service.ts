import { db } from "@/db";
import { users } from "@/db/schema";
import { compare, hash } from "bcryptjs";
import { eq } from "drizzle-orm";

export interface CreateUserResult {
  user: typeof users.$inferSelect | null;
  error?: string;
}
export async function createUser(
  email: string,
  name: string,
  password: string,
): Promise<CreateUserResult> {
  // Validate inputs
  if (!email || !email.includes("@")) {
    return { user: null, error: "Invalid email address" };
  }
  if (!name || name.trim().length < 2) {
    return { user: null, error: "Name must be at least 2 characters" };
  }
  if (!password || password.length < 8) {
    return { user: null, error: "Password must be at least 8 characters" };
  }
  try {
    const hashedPassword = await hash(password, 10);
    // Use a transaction for atomicity
    const [user] = await db.transaction(async (tx) => {
      // Check if user already exists
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
    return { user };
  } catch (error) {
    console.error("Error creating user:", error);
    return {
      user: null,
      error: error instanceof Error ? error.message : "Failed to create user",
    };
  }
}

export async function findUserByEmail(email: string) {
  try {
    if (!email || !email.includes("@")) {
      return null;
    }
    return await db.query.users.findFirst({
      where: eq(users.email, email),
    });
  } catch (error) {
    console.error("Error finding user by email:", error);
    throw error;
  }
}

export async function verifyPassword(password: string, hashedPassword: string) {
  try {
    if (!password || !hashedPassword) {
      return false;
    }

    return await compare(password, hashedPassword);
  } catch (error) {
    console.error("Error verifying password:", error);
    return false; // Fail securely
  }
}
