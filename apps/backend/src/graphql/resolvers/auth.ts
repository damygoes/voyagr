import { findOrCreateOAuthUser } from "@/services/auth/utils/findOrCreateOAuthUser";
import { generateToken } from "@/services/auth/utils/generateToken";
import { verifyUserCredentials } from "@/services/auth/utils/verifyUserCredentials";
import { MutationResolvers } from "../__generated__/types";

export const authResolvers: MutationResolvers = {
  async login(_parent, args) {
    try {
      const user = await verifyUserCredentials(args.email, args.password);
      const token = generateToken(user);
      return { user, token };
    } catch (error) {
      // Log error securely without exposing details
      console.error("Login failed:", error);
      throw new Error("Invalid credentials");
    }
  },

  async upsertOAuthUser(_parent, args) {
    try {
      // Validate email format
      if (!args.email || !/\S+@\S+\.\S+/.test(args.email)) {
        throw new Error("Invalid email format");
      }

      const user = await findOrCreateOAuthUser(
        args.email,
        args.name ?? undefined,
      );
      const token = generateToken(user);
      return { user, token };
    } catch (error) {
      console.error("OAuth user creation failed:", error);
      throw new Error("Failed to process OAuth user");
    }
  },
};
