import { AppError } from "./AppError.js";
import { HttpStatusCode } from "./StatusCode.js";

export class ForbiddenError extends AppError {
  constructor(message: string) {
    super(message, HttpStatusCode.FORBIDDEN, "FORBIDDEN");
  }
}
