import { Request, Response } from "express";
import { LoginSchema,  CreateAccountSchema,} from "../validators/account.validator.js";
import { container } from "../../config/container.js";
import { SuccessMessages } from "../../../shared/messages/SuccessMessagesFr.js";
import { ResponseFormatter } from "../middlewares/ReponseFormatter.js";

export class AuthController {
  login = async (req: Request, res: Response): Promise<void> => {
    const dto = LoginSchema.parse(req.body);
    const result = await container.loginUseCase.execute(dto);
    ResponseFormatter.success(res, result, SuccessMessages.CONNEXION_REUSSIE);
  };
}