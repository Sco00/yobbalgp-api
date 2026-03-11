export declare class AppError extends Error {
    readonly message: string;
    readonly statusCode: number;
    readonly code: string;
    readonly isOperational: boolean;
    constructor(message: string, statusCode: number, code: string, isOperational?: boolean);
}
//# sourceMappingURL=AppError.d.ts.map