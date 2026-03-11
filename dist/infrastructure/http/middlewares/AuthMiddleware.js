// src/infrastructure/http/middlewares/AuthMiddleware.ts
import { JWTService } from "../../../shared/services/JWTService.js";
import { UnauthorizedError } from "../../../shared/errors/UnauthorizedError.js";
import { ForbiddenError } from "../../../shared/errors/ForbiddenError.js";
import { ErrorsMessages } from "../../../shared/messages/ErrorsMessagesFr.js";
import { SECRET_KEY } from "../../config/env.js";
export class AuthMiddleware {
    static authenticate(req, _res, next) {
        const authHeader = req.headers["authorization"];
        const token = authHeader && authHeader.split(" ")[1];
        if (!token) {
            throw new UnauthorizedError(ErrorsMessages.TOKEN_MANQUANT);
        }
        const decoded = JWTService.decryptToken(token, SECRET_KEY);
        if (typeof decoded !== "object" || decoded === null || !("id" in decoded)) {
            throw new ForbiddenError(ErrorsMessages.TOKEN_INVALIDE);
        }
        req.user = decoded;
        next();
    }
    static authorizeRole(roles) {
        return (req, res, next) => {
            if (!req.user || !roles.includes(req.user.role)) {
                throw new ForbiddenError(ErrorsMessages.ACCES_REFUSE);
            }
            next();
        };
    }
    static authorizeAdmin(req, res, next) {
        return AuthMiddleware.authorizeRole(["ADMIN"])(req, res, next);
    }
    static authorizeClient(req, res, next) {
        return AuthMiddleware.authorizeRole(["ADMIN", "CLIENT"])(req, res, next);
    }
}
//# sourceMappingURL=AuthMiddleware.js.map