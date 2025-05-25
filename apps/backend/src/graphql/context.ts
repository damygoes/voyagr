import { env } from "@/config/env";
import { getOrCreateUser } from "@/services/auth/utils/getOrCreateUser";
import { User } from "@voyagr/types/src/user/User";
import { Request } from "express";
import jwt from "jsonwebtoken";

export async function createContext({ req }: { req: Request }) {
  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith("Bearer ")) {
    return { user: null };
  }

  const token = authHeader.split(" ")[1];
  if (!token) return { user: null };

  try {
    const decoded = jwt.verify(token, env.NEXTAUTH_SECRET);
    if (
      typeof decoded === "object" &&
      decoded !== null &&
      "id" in decoded &&
      typeof decoded.id === "string"
    ) {
      const user = await getOrCreateUser(decoded as User);
      return { user };
    }
  } catch (err) {
    console.warn("Invalid token in context:", err);
  }

  return { user: null };
}

export type GraphQLContext = Awaited<ReturnType<typeof createContext>>;
