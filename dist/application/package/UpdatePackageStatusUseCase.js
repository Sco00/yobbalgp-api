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
import { NotFoundError } from "../../shared/errors/NotFoundError.js";
import { ValidationError } from "../../shared/errors/BadRequestError.js";
import { ErrorsMessages } from "../../shared/messages/ErrorsMessagesFr.js";
export class UpdatePackageStatusUseCase {
    constructor(packageRepo) {
        this.packageRepo = packageRepo;
    }
    execute(id, state) {
        return __awaiter(this, void 0, void 0, function* () {
            const row = yield this.packageRepo.findById(id);
            if (!row)
                throw new NotFoundError(ErrorsMessages.COLIS_INTROUVABLE);
            const pkg = new Package(row);
            if (pkg.getCurrentStatus() === state) {
                throw new ValidationError(ErrorsMessages.COLIS_STATUT_IDENTIQUE);
            }
            yield this.packageRepo.updateStatus(id, state);
        });
    }
}
//# sourceMappingURL=UpdatePackageStatusUseCase.js.map