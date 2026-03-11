var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { LoginSchema, CreateAccountSchema, } from "../validators/account.validator.js";
import { container } from "../../config/container.js";
import { SuccessMessages } from "../../../shared/messages/SuccessMessagesFr.js";
import { ResponseFormatter } from "../middlewares/ReponseFormatter.js";
import { HttpStatusCode } from "../../../shared/errors/StatusCode.js";
export class AccountController {
    constructor() {
        this.login = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const dto = LoginSchema.parse(req.body);
            const result = yield container.loginUseCase.execute(dto);
            ResponseFormatter.success(res, result, SuccessMessages.CONNEXION_REUSSIE);
        });
        this.create = (req, res) => __awaiter(this, void 0, void 0, function* () {
            var _a;
            const dto = CreateAccountSchema.parse(req.body);
            const person = yield container.createPersonUseCase.execute({
                firstName: dto.firstName,
                lastName: dto.lastName,
                mobile: (_a = dto.mobile) !== null && _a !== void 0 ? _a : null,
                personTypeId: dto.personTypeId,
            }, false);
            const account = yield container.createAccountUseCase.execute({
                email: dto.email,
                password: dto.password,
                roleId: dto.roleId,
                personId: person.id,
            });
            ResponseFormatter.success(res, account, SuccessMessages.COMPTE_CREE, HttpStatusCode.CREATED);
        });
    }
}
//# sourceMappingURL=AccountController.js.map