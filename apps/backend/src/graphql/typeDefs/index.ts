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

  type Query {
    hello: String!
  }

  type Mutation {
    login(email: String!, password: String!): AuthResponse!
    upsertOAuthUser(email: String!, name: String): AuthResponse!
  }
`;
