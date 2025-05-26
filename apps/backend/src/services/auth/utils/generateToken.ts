import { env } from "@/config/env";
import { SafeUser } from "@voyagr/types/src/user/User";
import jwt from "jsonwebtoken";

export function generateToken(user: SafeUser) {
  if (!env.JWT_SECRET) {
    throw new Error("JWT_SECRET is not configured");
  }

  try {
    return jwt.sign({ id: user.id }, env.JWT_SECRET, {
      expiresIn: "7d", // Consider shorter expiration
    });
  } catch (error) {
    console.error("Token generation error:", error);
    throw new Error("Failed to generate token");
  }
}
