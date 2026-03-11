var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { ConflictError } from '../../shared/errors/ConflictError.js';
import { ErrorsMessages } from '../../shared/messages/ErrorsMessagesFr.js';
export class CreatePersonUseCase {
    constructor(personRepo) {
        this.personRepo = personRepo;
    }
    execute(dto_1) {
        return __awaiter(this, arguments, void 0, function* (dto, throwIfExisjs = true) {
            if (dto.mobile) {
                const existing = yield this.personRepo.findByMobile(dto.mobile);
                if (existing) {
                    if (throwIfExisjs)
                        throw new ConflictError(ErrorsMessages.PERSON_DEJA_EXISTANTE);
                    return existing;
                }
            }
            return yield this.personRepo.save(dto);
        });
    }
}
//# sourceMappingURL=CreatePersonUseCase.js.map