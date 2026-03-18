var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { Package } from "../../domain/entities/Package/Package.js";
import { ValidationError } from "../../shared/errors/BadRequestError.js";
import { NotFoundError } from "../../shared/errors/NotFoundError.js";
import { ErrorsMessages } from "../../shared/messages/ErrorsMessagesFr.js";
export class AddNatureToPackageUseCase {
    constructor(packageRepo, natureRepo) {
        this.packageRepo = packageRepo;
        this.natureRepo = natureRepo;
    }
    execute(packageId, input) {
        return __awaiter(this, void 0, void 0, function* () {
            const row = yield this.packageRepo.findById(packageId);
            if (!row)
                throw new NotFoundError(ErrorsMessages.COLIS_INTROUVABLE);
            const pkg = new Package(row);
            if (pkg.isArchived)
                throw new ValidationError(ErrorsMessages.COLIS_DEJA_ARCHIVE);
            if (!pkg.canBeDeleted())
                throw new ValidationError(ErrorsMessages.COLIS_NON_SUPPRIMABLE);
            const nature = yield this.natureRepo.findById(input.natureId);
            if (!nature)
                throw new NotFoundError(ErrorsMessages.NATURE_INTROUVABLE);
            const price = nature.unitPrice * input.quantity;
            yield this.packageRepo.addNature(packageId, {
                natureId: input.natureId,
                quantity: input.quantity,
                price,
            });
        });
    }
}
//# sourceMappingURL=AddNatureToPackageUseCase.js.map