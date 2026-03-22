import { Request, Response } from "express";
import { LoginSchema, RefreshTokenSchema } from "../validators/account.validator.js";
import { container } from "../../config/container.js";
import { SuccessMessages } from "../../../shared/messages/SuccessMessagesFr.js";
import { ResponseFormatter } from "../middlewares/ReponseFormatter.js";

export class AuthController {
  login = async (req: Request, res: Response): Promise<void> => {
    const dto = LoginSchema.parse(req.body);
    const result = await container.loginUseCase.execute(dto);
    ResponseFormatter.success(res, result, SuccessMessages.CONNEXION_REUSSIE);
  };

  refresh = async (req: Request, res: Response): Promise<void> => {
    const dto = RefreshTokenSchema.parse(req.body);
    const result = await container.refreshTokenUseCase.execute(dto);
    ResponseFormatter.success(res, result, SuccessMessages.CONNEXION_REUSSIE);
  };
}