import { ZodError } from "zod";
import { AppError } from "../../../shared/errors/AppError.js";
import { Request, Response, NextFunction } from "express";
import { HttpStatusCode } from "../../../shared/errors/StatusCode.js";
import { ErrorsMessages } from "../../../shared/messages/ErrorsMessagesFr.js";

export const errorHandler = (err: unknown, req: Request, res: Response,  _next: NextFunction,): void => {
  // Erreur Zod
  if (err instanceof ZodError) {
    res.status(HttpStatusCode.BAD_REQUEST).json({
      success: false,
      error: {
        code: "VALIDATION_ERROR",
        message: ErrorsMessages.ERREUR_VALIDATION,
        fields: err.issues.map((e) => ({
          field: e.path.join("."),
          message: e.message,
        })),
      },
    });
    return;
  }

  // Erreur métier
  if (err instanceof AppError) {
    res.status(err.statusCode).json({
      success: false,
      error: {
        code: err.code,
        message: err.message,
      },
    });
    return;
  }

  // Erreur inattendue
  console.warn("[UNHANDLED ERROR]", err);
  res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
    success: false,
    error: {
      code: "INTERNAL_ERROR",
      message: ErrorsMessages.ERREUR_INTERNE,
    },
  });
};
