import cors from "cors";
import express, { Request, Response } from "express";
import swaggerUi from "swagger-ui-express";

import { env } from "./config/env";
import { swaggerSpec } from "./docs/swagger";
import { errorHandler } from "./middleware/errorHandler";
import { logger } from "./middleware/logger";
import v1Router from "./routes/v1";

async function start() {
  // Load environment Variables

  // Connect to Database
  // await connectToDatabase();

  const app = express();
  const healthRouter = express.Router();
  // Health Check
  healthRouter.get("/", (_req: Request, res: Response) => {
    return res.json({ status: "ok" });
  });

  // Middleware
  app.use(
    cors({
      origin: env.CORS_ORIGIN as string,
      credentials: true,
    }),
  );
  app.use(express.json());
  app.use(logger);
  // Health Check
  app.use("/health", healthRouter);
  // Error Handler
  app.use(errorHandler);

  // Swagger
  app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

  // Routes
  app.use("/api/v1", v1Router);

  app.listen(env.PORT, () => {
    console.log(`✅ Server running on http://localhost:${env.PORT}`);
    console.log(`📘 Docs available at http://localhost:${env.PORT}/docs`);
  });
}

start();
