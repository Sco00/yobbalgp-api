var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { CreatePersonSchema } from '../validators/person.validator.js';
import { container } from '../../config/container.js';
import { SuccessMessages } from '../../../shared/messages/SuccessMessagesFr.js';
export class PersonController {
    constructor() {
        this.create = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const dto = CreatePersonSchema.parse(req.body);
            const result = yield container.createPersonUseCase.execute(dto);
            res.status(201).json({
                success: true,
                message: SuccessMessages.PERSONNE_CREEE,
                data: { person: result },
            });
        });
        this.list = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const result = yield container.listPersonsUseCase.execute(req.query);
            res.json(Object.assign({ success: true, message: SuccessMessages.PERSONNES_RECUPEREES }, result));
        });
    }
}
//# sourceMappingURL=PersonController.js.map