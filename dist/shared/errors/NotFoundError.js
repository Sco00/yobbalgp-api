import { AppError } from "./AppError.js";
import { HttpStatusCode } from "./StatusCode.js";
export class NotFoundError extends AppError {
    constructor(message) {
        super(message, HttpStatusCode.NOT_FOUND, "NOT_FOUND");
    }
}
//# sourceMappingURL=NotFoundError.js.map