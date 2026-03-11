var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import bcrypt from "bcryptjs";
import { ConflictError } from "../../shared/errors/ConflictError.js";
import { ErrorsMessages } from "../../shared/messages/ErrorsMessagesFr.js";
export class CreateAccountUseCase {
    constructor(accountRepo) {
        this.accountRepo = accountRepo;
    }
    execute(props) {
        return __awaiter(this, void 0, void 0, function* () {
            const existing = yield this.accountRepo.findByEmail(props.email);
            if (existing)
                throw new ConflictError(ErrorsMessages.ACCOUNT_DEJA_EXISTANT);
            const hashedPassword = yield bcrypt.hash(props.password, 12);
            return yield this.accountRepo.save(Object.assign(Object.assign({}, props), { password: hashedPassword }));
        });
    }
}
//# sourceMappingURL=CreateAccountUseCase.js.map