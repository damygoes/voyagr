import { User } from "@voyagr/types";

// This file is used to extend the Express Request object to include a user property.
// This is useful for middleware that authenticates users and attaches the user object to the request.
declare global {
  namespace Express {
    interface Request {
      user?: User;
    }
  }
}
