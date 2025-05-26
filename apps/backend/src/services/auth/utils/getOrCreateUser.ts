import { db } from "@/db";
import { users } from "@/db/db-schema";
import { User } from "@voyagr/types/src/user/User";
import { eq } from "drizzle-orm";

export async function getOrCreateUser(user: User): Promise<User> {
  const existingUser = await db.query.users.findFirst({
    where: eq(users.id, user.id),
  });

  if (existingUser) {
    return {
      id: existingUser.id,
      name: existingUser.name ?? undefined,
      email: existingUser.email,
      permissions: existingUser.permissions,
      createdAt:
        existingUser.createdAt?.toISOString() ?? new Date().toISOString(),
      updatedAt:
        existingUser.updatedAt?.toISOString() ?? new Date().toISOString(),
    };
  }

  const newUser = await db
    .insert(users)
    .values({
      name: user.name,
      email: user.email,
      permissions: user.permissions,
      createdAt: new Date(),
      updatedAt: new Date(),
    })
    .returning()
    .then((res) => res[0]);

  return {
    id: newUser.id,
    name: newUser.name ?? undefined,
    email: newUser.email,
    permissions: newUser.permissions,
    createdAt: newUser.createdAt?.toISOString() ?? new Date().toISOString(),
    updatedAt: newUser.updatedAt?.toISOString() ?? new Date().toISOString(),
  };
}
