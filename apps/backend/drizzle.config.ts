import { env } from "@/config/env";
import { defineConfig } from "drizzle-kit";

export default defineConfig({
  out: "./drizzle",
  schema: "./src/db/schema.ts",
  dialect: "postgresql",
  dbCredentials: {
    url: env.DATABASE_URL,
  },
  verbose: true,
  strict: true,
});

// schema: [
//   './src/db/productsSchema.ts',
//   './src/db/usersSchema.ts',
//   './src/db/ordersSchema.ts',
// ],
