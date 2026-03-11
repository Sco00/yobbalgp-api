var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { CreateDepartureSchema, DepartureFiltersSchema } from '../validators/departure.validator.js';
import { container } from '../../config/container.js';
import { ResponseFormatter } from '../middlewares/ReponseFormatter.js';
import { SuccessMessages } from '../../../shared/messages/SuccessMessagesFr.js';
import { HttpStatusCode } from '../../../shared/errors/StatusCode.js';
export class DepartureController {
    constructor() {
        this.create = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const dto = CreateDepartureSchema.parse(req.body);
            const result = yield container.createDepartureUseCase.execute(Object.assign(Object.assign({}, dto), { creatorId: req.user.id }));
            ResponseFormatter.success(res, result, SuccessMessages.DEPART_CREE, HttpStatusCode.CREATED);
        });
    }
    list(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const filters = DepartureFiltersSchema.parse(req.query);
            const result = yield container.listDeparturesUseCase.execute(filters);
            ResponseFormatter.success(res, result, SuccessMessages.DEPARTS_RECUPERES);
        });
    }
    getById(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield container.getDepartureByIdUseCase.execute(req.params.id);
            ResponseFormatter.success(res, result, SuccessMessages.DEPART_RECUPERE);
        });
    }
    close(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            yield container.closeDepartureUseCase.execute(req.params.id);
            ResponseFormatter.success(res, null, SuccessMessages.DEPART_FERME);
        });
    }
}
//# sourceMappingURL=DepartureController.js.map