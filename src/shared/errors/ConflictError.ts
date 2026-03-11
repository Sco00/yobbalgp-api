import { AppError } from "./AppError.js";
import { HttpStatusCode } from "./StatusCode.js";

export class ConflictError extends AppError {
  constructor(message: string) {
    super(message, HttpStatusCode.CONFLICT, "CONFLICT");
  }
}
