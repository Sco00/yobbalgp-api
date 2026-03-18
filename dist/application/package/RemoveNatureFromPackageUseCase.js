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
export class RemoveNatureFromPackageUseCase {
    constructor(packageRepo) {
        this.packageRepo = packageRepo;
    }
    execute(packageId, natureId) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, _b;
            // 1. Vérifier que le colis existe
            const row = yield this.packageRepo.findById(packageId);
            if (!row)
                throw new NotFoundError(ErrorsMessages.COLIS_INTROUVABLE);
            const pkg = new Package(row);
            // 2. Vérifier que le colis peut être modifié
            if (pkg.isArchived)
                throw new ValidationError(ErrorsMessages.COLIS_DEJA_ARCHIVE);
            if (!pkg.canBeDeleted())
                throw new ValidationError(ErrorsMessages.COLIS_NON_SUPPRIMABLE);
            // 3. Vérifier qu'il restera au moins une nature
            if (((_b = (_a = pkg.natures) === null || _a === void 0 ? void 0 : _a.length) !== null && _b !== void 0 ? _b : 0) <= 1) {
                throw new ValidationError(ErrorsMessages.COLIS_NATURE_OBLIGATOIRE);
            }
            // 4. Supprimer la nature
            yield this.packageRepo.removeNature(packageId, natureId);
        });
    }
}
//# sourceMappingURL=RemoveNatureFromPackageUseCase.js.map