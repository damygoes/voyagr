import dotenv from "dotenv";
import { z } from "zod";

dotenv.config({
  path: "./.env",
});

const envSchema = z.object({
  NODE_ENV: z
    .enum(["development", "test", "production"])
    .default("development"),
  PORT: z.coerce.number().default(4000),
  DATABASE_URL: z
    .string()
    .refine(
      (val) => val.startsWith("postgres://") || val.startsWith("postgresql://"),
      {
        message: "Invalid DATABASE_URL format",
      },
    ),
  AWS_REGION: z.string(),
  COGNITO_POOL_ID: z.string(),
  COGNITO_CLIENT_ID: z.string(),
  S3_BUCKET_NAME: z.string(),
  CORS_ORIGIN: z.string().url(),
});

// Validate process.env
const parsedEnv = envSchema.safeParse(process.env);

if (!parsedEnv.success) {
  console.error("❌ Invalid environment variables:", parsedEnv.error.format());
  process.exit(1);
}

export const env = parsedEnv.data;

// DATABASE_URL: z.string().min(1, "DATABASE_URL is required"),
