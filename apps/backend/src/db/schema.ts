// import { relations } from 'drizzle-orm';
import { UserPermissions } from "@voyagr/types/src/user/UserPermissions";
import { jsonb, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: uuid("id").primaryKey().defaultRandom(),
  email: text("email").notNull().unique(),
  name: text("name").notNull(),
  hashedPassword: text("hashed_password"), // Optional for OAuth-only users
  permissions: jsonb("permissions")
    .$type<UserPermissions>()
    .notNull()
    .default({}),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});
