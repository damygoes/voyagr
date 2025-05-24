import { Router } from "express";
import rateLimit from "express-rate-limit";
import {
  loginUser,
  registerUser,
  upsertOAuthUserHandler,
} from "./auth.controller";

const router = Router();

// Rate limiting for auth endpoints to prevent brute force attacks
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // limit each IP to 5 requests per windowMs
  message: "Too many authentication attempts, please try again later.",
});

// More lenient rate limiting for OAuth endpoints
const oauthLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 20, // higher limit for OAuth operations
  message: "Too many OAuth requests, please try again later.",
});

router.post("/register", authLimiter, registerUser);
router.post("/login", authLimiter, loginUser);
router.post("/upsert-oauth-user", oauthLimiter, upsertOAuthUserHandler);
export default router;
