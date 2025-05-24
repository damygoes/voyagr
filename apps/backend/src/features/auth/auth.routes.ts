import { Router } from "express";
import {
  loginUser,
  registerUser,
  upsertOAuthUserHandler,
} from "./auth.controller";

const router = Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/upsert-oauth-user", upsertOAuthUserHandler);

export default router;
