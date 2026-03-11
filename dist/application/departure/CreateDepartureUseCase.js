var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { ValidationError } from '../../shared/errors/BadRequestError.js';
import { ErrorsMessages } from '../../shared/messages/ErrorsMessagesFr.js';
export class CreateDepartureUseCase {
    constructor(departureRepo) {
        this.departureRepo = departureRepo;
    }
    execute(input) {
        return __awaiter(this, void 0, void 0, function* () {
            if (input.deadline >= input.departureDate) {
                throw new ValidationError(ErrorsMessages.DEPART_DEADLINE_INVALIDE);
            }
            const props = Object.assign(Object.assign({}, input), { creatorId: input.creatorId });
            return yield this.departureRepo.save(props);
        });
    }
}
//# sourceMappingURL=CreateDepartureUseCase.js.map