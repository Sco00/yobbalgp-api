var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { NotFoundError } from "../../shared/errors/NotFoundError.js";
import { ValidationError } from "../../shared/errors/BadRequestError.js";
import { ErrorsMessages } from "../../shared/messages/ErrorsMessagesFr.js";
import { generateReference } from "../../shared/utils/generateReference.js";
export class CreatePackageUseCase {
    constructor(packageRepo, departureRepo, natureRepo) {
        this.packageRepo = packageRepo;
        this.departureRepo = departureRepo;
        this.natureRepo = natureRepo;
    }
    execute(input) {
        return __awaiter(this, void 0, void 0, function* () {
            const departure = yield this.departureRepo.findById(input.departureGpId);
            if (!departure) {
                throw new NotFoundError(ErrorsMessages.DEPART_INTROUVABLE);
            }
            if (departure.isClosed) {
                throw new ValidationError(ErrorsMessages.DEPART_FERME);
            }
            const naturesWithPrice = yield Promise.all(input.packageNatures.map((n) => __awaiter(this, void 0, void 0, function* () {
                const nature = yield this.natureRepo.findById(n.natureId);
                if (!nature)
                    throw new NotFoundError(ErrorsMessages.NATURE_INTROUVABLE);
                return {
                    natureId: n.natureId,
                    quantity: n.quantity,
                    price: nature.unitPrice * n.quantity,
                };
            })));
            const lastReference = yield this.packageRepo.getLastReference();
            const reference = generateReference(lastReference);
            const props = Object.assign(Object.assign({}, input), { reference, packageNatures: naturesWithPrice });
            return yield this.packageRepo.save(props);
        });
    }
}
//# sourceMappingURL=CreatePackageUseCase.js.map