import { AppError } from "./AppError.js";
import { HttpStatusCode } from "./StatusCode.js";

export class NotFoundError extends AppError {
  constructor(message: string) {
    super(message, HttpStatusCode.NOT_FOUND, "NOT_FOUND");
  }
}
