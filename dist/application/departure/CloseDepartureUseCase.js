var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { DepartureGp } from '../../domain/entities/DepartureGp/DepartureGp.js';
import { NotFoundError } from '../../shared/errors/NotFoundError.js';
import { ValidationError } from '../../shared/errors/BadRequestError.js';
import { ErrorsMessages } from '../../shared/messages/ErrorsMessagesFr.js';
export class CloseDepartureUseCase {
    constructor(departureRepo) {
        this.departureRepo = departureRepo;
    }
    execute(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const departure = yield this.departureRepo.findById(id);
            if (!departure)
                throw new NotFoundError(ErrorsMessages.DEPART_INTROUVABLE);
            const departureGp = new DepartureGp(departure);
            if (!departureGp.canBeClosed()) {
                throw new ValidationError(ErrorsMessages.DEPART_DEJA_FERME);
            }
            yield this.departureRepo.close(id);
        });
    }
}
//# sourceMappingURL=CloseDepartureUseCase.js.map