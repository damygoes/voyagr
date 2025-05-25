import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import cors from "cors";
import express from "express";
import { graphqlHTTP } from "express-graphql";
import { env } from "./config/env";
import { createContext } from "./graphql/context";
import { schema } from "./graphql/schema";
import { authenticateJWT } from "./middleware/authenticateJWT";
import { errorHandler } from "./middleware/errorHandler";
import { logger } from "./middleware/logger";

async function start() {
  const app = express();

  // Health check and root
  app.get("/", (_req, res) => res.send("Voyagr API is running."));
  app.get("/health", (_req, res) => res.json({ status: "ok" }));

  // Global middleware
  app.use(
    cors({
      origin: env.CORS_ORIGIN,
      credentials: true,
    }),
  );
  app.use(express.json());
  app.use(logger);

  // Apollo Server setup
  const server = new ApolloServer({ schema });
  await server.start();

  // Dev-only GraphiQL UI
  if (process.env.NODE_ENV !== "production") {
    app.use(
      "/graphiql",
      graphqlHTTP({
        schema,
        graphiql: true,
      }),
    );
  }

  // Main GraphQL endpoint
  app.use(
    "/voyagr-api",
    express.json(), // Required for Apollo
    authenticateJWT, // Optional middleware
    expressMiddleware(server, {
      context: async ({ req }) => createContext({ req }),
    }),
  );

  // Global error handler
  app.use(errorHandler);

  // Start server
  app.listen(env.PORT, () => {
    console.log(`✅ Server running on http://localhost:${env.PORT}`);
    console.log(`🚀 GraphQL API at http://localhost:${env.PORT}/voyagr-api`);
    if (process.env.NODE_ENV !== "production") {
      console.log(`🧪 GraphiQL at http://localhost:${env.PORT}/graphiql`);
    }
  });
}

start().catch((err) => {
  console.error("❌ Failed to start server:", err);
  process.exit(1);
});
