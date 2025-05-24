import { db } from "@/db";
import { users } from "@/db/schema";
import { validateEmail } from '@/utils/validateEmail';
import { compare, hash } from "bcryptjs";
import { eq } from "drizzle-orm";
import { SafeUser } from "../users/User.types";

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
    if (!validateEmail(email)) {
       return null;
     }
     return await db.query.users.findFirst({
       where: eq(users.email, email),
     });
   } catch (error) {
     console.error("Error finding user by email:", error);
     return null; // Or return a consistent error object structure
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

export async function manageUserFromOAuth({
  email,
  name,
}: {
  email: string;
  name: string;
}): Promise<SafeUser> {
  if (!email || !name) {
    throw new Error("Email and name are required");
  }

  // Use a transaction to prevent race conditions
  const user = await db.transaction(async (tx) => {
    const existing = await tx
      .select()
      .from(users)
      .where(eq(users.email, email))
      .limit(1);

    if (existing[0]) {
      return existing[0];
    }

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

 // Omit sensitive fields safely
 // eslint-disable-next-line @typescript-eslint/no-unused-vars
 const { hashedPassword, createdAt, updatedAt, ...safeUser } = user;
 return safeUser as SafeUser;
}
