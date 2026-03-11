import { type Request, type Response, type NextFunction } from "express";
export declare class AuthMiddleware {
    static authenticate(req: Request, _res: Response, next: NextFunction): void;
    static authorizeRole(roles: string[]): (req: Request, res: Response, next: NextFunction) => void;
    static authorizeAdmin(req: Request, res: Response, next: NextFunction): void;
    static authorizeClient(req: Request, res: Response, next: NextFunction): void;
}
//# sourceMappingURL=AuthMiddleware.d.ts.map