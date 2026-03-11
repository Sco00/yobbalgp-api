var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import prisma from '../config/prisma.js';
const accountInclude = {
    role: true,
    person: true,
};
export class PrismaAccountRepository {
    save(props) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield prisma.account.create({
                data: props,
                include: accountInclude,
            });
        });
    }
    findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield prisma.account.findUnique({
                where: { id },
                include: accountInclude,
            });
        });
    }
    findByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield prisma.account.findUnique({
                where: { email },
                include: accountInclude,
            });
        });
    }
    update(id, props) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield prisma.account.update({
                where: { id },
                data: props,
                include: accountInclude,
            });
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield prisma.account.delete({ where: { id } });
        });
    }
}
//# sourceMappingURL=PrismaAccountRepository.js.map