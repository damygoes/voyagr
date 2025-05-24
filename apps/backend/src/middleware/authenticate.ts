import { env } from "@/config/env";
import { User } from "@voyagr/types/src/user/User";
import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

export function authenticateJWT(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const authHeader = req.headers.authorization;
  if (!authHeader)
    return res.status(401).json({ message: "Authorization header missing" });

  const parts = authHeader.split(" ");
  if (parts.length !== 2 || parts[0] !== "Bearer") {
    return res.status(401).json({
      message: "Invalid authorization format. Expected 'Bearer token'",
    });
  }

  const token = parts[1];
  if (!token) {
    return res.status(401).json({ message: "Token missing" });
  }

  try {
    if (!env.JWT_SECRET) {
      console.error("JWT_SECRET is not defined");
      return res.status(500).json({ message: "Server configuration error" });
    }
    const decoded = jwt.verify(token, env.JWT_SECRET);
    // Validate that decoded is an object with expected user properties
    if (
      typeof decoded === "object" &&
      decoded !== null &&
      "id" in decoded &&
      typeof decoded.id === "string"
    ) {
      req.user = decoded as User;
    } else {
      throw new Error("Invalid token payload structure");
    }
    next();
  } catch (err) {
    if (err instanceof jwt.JsonWebTokenError) {
      console.error("JWT validation error:", err.message);
      return res.status(401).json({ message: "Invalid authentication token" });
    } else if (err instanceof jwt.TokenExpiredError) {
      console.error("JWT expired:", err.message);
      return res.status(401).json({ message: "Authentication token expired" });
    } else {
      console.error("JWT error:", err);
      return res.status(401).json({ message: "Authentication failed" });
    }
  }
}
