export class AppError extends Error {
    constructor(message, statusCode, code, isOperational = true) {
        super(message);
        this.message = message;
        this.statusCode = statusCode;
        this.code = code;
        this.isOperational = isOperational;
        Object.setPrototypeOf(this, new.target.prototype);
    }
}
//# sourceMappingURL=AppError.js.map