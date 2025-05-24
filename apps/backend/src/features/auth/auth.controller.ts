import { env } from "@/config/env";
import { Request, Response } from "express";
import jwt, { SignOptions } from "jsonwebtoken";
import { SafeUser } from "../users/User.types";
import {
  createUser,
  findUserByEmail,
  manageUserFromOAuth,
  verifyPassword,
} from "./auth.service";

export async function registerUser(req: Request, res: Response) {
  const { email, name, password } = req.body;
  // Validate inputs
  if (!email || !name || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }
  try {
    const user = await createUser(email, name, password);
    // Omit sensitive data like hashedPassword
    const { user: userData } = user;
    if (!userData) {
      return res
        .status(400)
        .json({ message: user.error || "User creation failed" });
    }
    const safeUser: SafeUser = {
      id: userData.id,
      email: userData.email,
      name: userData.name,
      permissions: userData.permissions,
    };
    res.status(201).json(safeUser);
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({ message: "Failed to register user" });
  }
}

export async function loginUser(req: Request, res: Response) {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }
  try {
    const user = await findUserByEmail(email);
    if (
      !user ||
      !user.hashedPassword ||
      !(await verifyPassword(password, user.hashedPassword))
    ) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    // Remove sensitive data and return user with token
    const safeUser: SafeUser = {
      id: user.id,
      email: user.email,
      name: user.name,
      permissions: user.permissions,
    };

    // Generate JWT and include in response
    const signOptions: SignOptions = {
      expiresIn: "1h",
    };

    const token = jwt.sign({ id: user.id }, env.JWT_SECRET, signOptions);
    res.json({ user: safeUser, token });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "An error occurred during login" });
  }
}

export async function upsertOAuthUserHandler(req: Request, res: Response) {
  try {
    const { email, name } = req.body;

    if (!email || !name) {
      return res.status(400).json({ message: "Email and name are required" });
    }

    const safeUser = await manageUserFromOAuth({ email, name });
    return res.status(200).json(safeUser);
  } catch (err) {
    console.error("OAuth user upsert error:", err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}
