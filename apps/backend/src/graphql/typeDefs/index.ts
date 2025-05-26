export const typeDefs = /* GraphQL */ `
  scalar JSON

  type User {
    id: ID!
    name: String
    email: String!
    permissions: JSON!
  }

  type AuthResponse {
    user: User!
    token: String!
  }

  type SafeUser {
    id: ID!
    name: String
    email: String!
    permissions: JSON!
  }

  type AuthPayload {
    user: SafeUser!
    token: String!
  }

  type Query {
    hello: String!
  }

  type Mutation {
    login(email: String!, password: String!): AuthPayload!
    upsertOAuthUser(email: String!, name: String): AuthPayload!
    registerUser(email: String!, password: String!, name: String): AuthPayload!
  }
`;
