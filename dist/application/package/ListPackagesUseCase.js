var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
export class ListPackagesUseCase {
    constructor(packageRepo) {
        this.packageRepo = packageRepo;
    }
    execute(filters) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, _b;
            const { props, total } = yield this.packageRepo.findAll(filters);
            return {
                props,
                total,
                page: (_a = filters.page) !== null && _a !== void 0 ? _a : 1,
                limit: (_b = filters.limit) !== null && _b !== void 0 ? _b : 20,
            };
        });
    }
}
//# sourceMappingURL=ListPackagesUseCase.js.map