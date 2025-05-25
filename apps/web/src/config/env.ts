import dotenv from "dotenv";
import { z } from "zod";

dotenv.config({
  path: "./.env.local",
});

const envSchema = z.object({
  NODE_ENV: z
    .enum(["development", "test", "production"])
    .default("development"),
  NEXT_PUBLIC_API_URL: z.string().url(),
  NEXTAUTH_URL: z
    .string()
    .url()
    .optional()
    .refine(
      (val) => process.env.NODE_ENV !== "production" || val !== undefined,
      { message: "NEXTAUTH_URL is required in production" },
    ),
  GOOGLE_CLIENT_ID: z.string().min(1, "GOOGLE_CLIENT_ID is required"),
  GOOGLE_CLIENT_SECRET: z.string().min(1, "GOOGLE_CLIENT_SECRET is required"),
  NEXTAUTH_SECRET: z
    .string()
    .min(32, "NEXTAUTH_SECRET must be at least 32 characters"),
});

// Validate process.env
const parsedEnv = envSchema.safeParse(process.env);

if (!parsedEnv.success) {
  if (process.env.NODE_ENV === "development") {
    console.error(
      "❌ Invalid environment variables:",
      parsedEnv.error.format(),
    );
  } else {
    console.error("❌ Invalid environment variables detected");
  }
  process.exit(1);
}

export const env = parsedEnv.data;
