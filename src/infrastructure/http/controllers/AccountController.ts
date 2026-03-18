import { Request, Response } from "express";
import { LoginSchema,  CreateAccountSchema,} from "../validators/account.validator.js";
import { container } from "../../config/container.js";
import { SuccessMessages } from "../../../shared/messages/SuccessMessagesFr.js";
import { ResponseFormatter } from "../middlewares/ReponseFormatter.js";
import { HttpStatusCode } from "../../../shared/errors/StatusCode.js";

export class AccountController {
  create = async (req: Request, res: Response): Promise<void> => {
    const dto = CreateAccountSchema.parse(req.body);
    const person = await container.createPersonUseCase.execute(
      {
        firstName: dto.firstName!,
        lastName: dto.lastName!,
        mobile: dto.mobile!,
        personTypeId: dto.personTypeId!,
      },
      false,
    );

    const account = await container.createAccountUseCase.execute({
      email: dto.email,
      password: dto.password,
      roleId: dto.roleId,
      personId: person.id,
    });
    ResponseFormatter.success(res, account, SuccessMessages.COMPTE_CREE, HttpStatusCode.CREATED);
  };
}
