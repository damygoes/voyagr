import { env } from "@/config/env";
import { SafeUser } from "@voyagr/types/src/user/User";
import jwt from "jsonwebtoken";

export function generateToken(user: SafeUser) {
  return jwt.sign({ id: user.id, email: user.email }, env.JWT_SECRET, {
    expiresIn: "30d",
  });
}
