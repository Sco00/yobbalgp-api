// src/infrastructure/http/middlewares/AuthMiddleware.ts

import { type Request, type Response, type NextFunction } from "express";
import { JWTService } from "../../../shared/services/JWTService.js";
import { type JwtAccessPayload } from "../../../shared/types/JwtPayload.js";
import { type JwtRefreshPayload } from "../../../shared/types/JwtPayload.js";
import { UnauthorizedError } from "../../../shared/errors/UnauthorizedError.js";
import { ForbiddenError } from "../../../shared/errors/ForbiddenError.js";
import { ErrorsMessages } from "../../../shared/messages/ErrorsMessagesFr.js";
import { ENV } from "../../../shared/config/env.js";
import { HttpStatusCode } from "../../../shared/errors/StatusCode.js";

export class AuthMiddleware {
  static authenticate(req: Request, _res: Response, next: NextFunction): void {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) {
      throw new UnauthorizedError(ErrorsMessages.TOKEN_MANQUANT);
    }

    const decoded = JWTService.decryptToken(token, ENV.JWT_SECRET);

    if (typeof decoded !== "object" || decoded === null || !("id" in decoded)) {
      throw new ForbiddenError(ErrorsMessages.TOKEN_INVALIDE);
    }

    req.user = decoded as JwtAccessPayload;
    next();
  }

  static authorizeRole(roles: string[]) {
    return (req: Request, res: Response, next: NextFunction) => {
      if (!req.user || !roles.includes(req.user.role)) {
        throw new ForbiddenError(ErrorsMessages.ACCES_REFUSE);
      }
      next();
    };
  }

  static authorizeAdmin(req: Request, res: Response, next: NextFunction) {
    return AuthMiddleware.authorizeRole(["ADMIN"])(req, res, next);
  }

  static authorizeClient(req: Request, res: Response, next: NextFunction) {
    return AuthMiddleware.authorizeRole(["ADMIN", "CLIENT"])(req, res, next);
  }
}
