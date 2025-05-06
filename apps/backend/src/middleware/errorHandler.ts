import { NextFunction, Request, Response } from "express";
import { AppError } from "../../types";
import { env } from "../config/env";

export const errorHandler = (
  err: AppError,
  _req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _next: NextFunction,
) => {
  console.error(err.stack);
  // Determine if this is a known error type with a specific status code
  const statusCode = err.statusCode || 500;

  // In production, don't expose error details
  if (env.NODE_ENV === "production") {
    res.status(statusCode).json({
      error: "Internal server error",
    });
  } else {
    // In development, provide more details
    res.status(statusCode).json({
      error: err.message,
      stack: err.stack,
    });
  }
};
