import { AppError } from "./AppError.js";
import { HttpStatusCode } from "./StatusCode.js";

export class UnauthorizedError extends AppError {
  constructor(message: string) {
    super(message, HttpStatusCode.UNAUTHORIZED, "UNAUTHORIZED");
  }
}
