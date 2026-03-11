import { AppError } from "./AppError.js";
import { HttpStatusCode } from "./StatusCode.js";
export class ConflictError extends AppError {
    constructor(message) {
        super(message, HttpStatusCode.CONFLICT, "CONFLICT");
    }
}
//# sourceMappingURL=ConflictError.js.map