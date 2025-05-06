import { Request, Response } from "express";
import { createUser, findUserByEmail, verifyPassword } from "./auth.service";

export async function registerUser(req: Request, res: Response) {
  const { email, name, password } = req.body;
  const user = await createUser(email, name, password);
  res.status(201).json(user);
}

export async function loginUser(req: Request, res: Response) {
  const { email, password } = req.body;
  const user = await findUserByEmail(email);
  if (!user || !(await verifyPassword(password, user.hashedPassword!))) {
    return res.status(401).json({ message: "Invalid credentials" });
  }
  res.json(user);
}
