import { Request, Response } from "express";
import { createUser, findUserByEmail, verifyPassword } from "./auth.service";

export async function registerUser(req: Request, res: Response) {
  const { email, name, password } = req.body;
  // Validate inputs
  if (!email || !name || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }
  try {
    const user = await createUser(email, name, password);
    // Omit sensitive data like hashedPassword
    const { ...safeUser } = user;
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
    const { ...safeUser } = user;

    // Add code to generate JWT token here
    res.json({ user: safeUser });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "An error occurred during login" });
  }
}
