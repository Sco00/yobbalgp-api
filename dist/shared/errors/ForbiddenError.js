import { AppError } from "./AppError.js";
import { HttpStatusCode } from "./StatusCode.js";
export class ForbiddenError extends AppError {
    constructor(message) {
        super(message, HttpStatusCode.FORBIDDEN, "FORBIDDEN");
    }
}
//# sourceMappingURL=ForbiddenError.js.map