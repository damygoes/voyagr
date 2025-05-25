import { findOrCreateOAuthUser } from "@/services/auth/utils/findOrCreateOAuthUser";
import { generateToken } from "@/services/auth/utils/generateToken";
import { verifyUserCredentials } from "@/services/auth/utils/verifyUserCredentials";
import { MutationResolvers } from "../__generated__/types";

export const authResolvers: MutationResolvers = {
  async login(_parent, args) {
    const user = await verifyUserCredentials(args.email, args.password);
    const token = generateToken(user); // Return JWT
    return { user, token };
  },

  async upsertOAuthUser(_parent, args) {
    const user = await findOrCreateOAuthUser(
      args.email,
      args.name ?? undefined,
    );
    const token = generateToken(user);
    return { user, token };
  },
};
