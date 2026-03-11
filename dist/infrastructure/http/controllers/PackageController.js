var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { CreatePackageSchema, UpdatePackageStatusSchema, PackageFiltersSchema, } from '../validators/package.validators.js';
import { container } from '../../config/container.js';
import { ResponseFormatter } from '../middlewares/ReponseFormatter.js';
import { SuccessMessages } from '../../../shared/messages/SuccessMessagesFr.js';
import { HttpStatusCode } from '../../../shared/errors/StatusCode.js';
export class PackageController {
    constructor() {
        this.create = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const dto = CreatePackageSchema.parse(req.body);
            const result = yield container.createPackageUseCase.execute(Object.assign(Object.assign({}, dto), { creatorId: req.user.id }));
            ResponseFormatter.success(res, result, SuccessMessages.COLIS_CREE, HttpStatusCode.CREATED);
        });
    }
    list(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const filters = PackageFiltersSchema.parse(req.query);
            const result = yield container.listPackagesUseCase.execute(filters);
            ResponseFormatter.success(res, result, SuccessMessages.COLIS_RECUPERES);
        });
    }
    getById(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield container.getPackageByIdUseCase.execute(req.params.id);
            ResponseFormatter.success(res, result, SuccessMessages.COLIS_RECUPERE);
        });
    }
    updateStatus(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { state } = UpdatePackageStatusSchema.parse(req.body);
            yield container.updatePackageStatusUseCase.execute(req.params.id, state);
            ResponseFormatter.success(res, null, SuccessMessages.COLIS_STATUT_MODIFIE);
        });
    }
    archive(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            yield container.archivePackageUseCase.execute(req.params.id);
            ResponseFormatter.success(res, null, SuccessMessages.COLIS_ARCHIVE);
        });
    }
    delete(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            yield container.deletePackageUseCase.execute(req.params.id);
            ResponseFormatter.success(res, null, SuccessMessages.COLIS_SUPPRIME);
        });
    }
}
//# sourceMappingURL=PackageController.js.map