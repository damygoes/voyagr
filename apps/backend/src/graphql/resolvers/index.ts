import GraphQLJSON from "graphql-type-json";
import { authResolvers } from "./auth";
import { helloResolver } from "./hello";

export const resolvers = {
  JSON: GraphQLJSON, // Register the scalar

  Query: {
    hello: helloResolver,
  },
  Mutation: {
    login: authResolvers.login,
    upsertOAuthUser: authResolvers.upsertOAuthUser,
    registerUser: authResolvers.register,
  },
};
