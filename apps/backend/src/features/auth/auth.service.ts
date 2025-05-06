import { db } from "@/db";
import { users } from "@/db/schema";
import { compare, hash } from "bcryptjs";
import { eq } from "drizzle-orm";

export async function createUser(
  email: string,
  name: string,
  password: string,
) {
  const hashedPassword = await hash(password, 10);
  const [user] = await db
    .insert(users)
    .values({
      email,
      name,
      hashedPassword,
      permissions: {},
    })
    .returning();
  return user;
}

export async function findUserByEmail(email: string) {
  return db.query.users.findFirst({
    where: eq(users.email, email),
  });
}

export async function verifyPassword(password: string, hashedPassword: string) {
  return compare(password, hashedPassword);
}
