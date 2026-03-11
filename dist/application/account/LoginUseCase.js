var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { JWTService } from '../../shared/services/JWTService.js';
import { SECRET_KEY } from '../../infrastructure/config/env.js';
import { UnauthorizedError } from '../../shared/errors/UnauthorizedError.js';
import { ErrorsMessages } from '../../shared/messages/ErrorsMessagesFr.js';
import bcrypt from 'bcryptjs';
export class LoginUseCase {
    constructor(accountRepo) {
        this.accountRepo = accountRepo;
    }
    execute(dto) {
        return __awaiter(this, void 0, void 0, function* () {
            const account = yield this.accountRepo.findByEmail(dto.email);
            if (!account) {
                throw new UnauthorizedError(ErrorsMessages.IDENTIFIANTS_INCORRECTS);
            }
            const isValid = yield bcrypt.compare(dto.password, account.password);
            if (!isValid) {
                throw new UnauthorizedError(ErrorsMessages.IDENTIFIANTS_INCORRECTS);
            }
            const accessToken = JWTService.cryptData({
                id: account.id,
                email: account.email,
                role: account.role.name,
            }, SECRET_KEY, 1);
            const refreshToken = JWTService.cryptData({
                email: account.email,
            }, SECRET_KEY);
            return {
                accessToken,
                refreshToken,
                user: {
                    id: account.id,
                    email: account.email,
                    role: account.role.name,
                    personId: account.personId,
                }
            };
        });
    }
}
//# sourceMappingURL=LoginUseCase.js.map