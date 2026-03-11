var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import prisma from "../config/prisma.js";
const personInclude = {
    personType: true,
    account: true
};
export class PrismaPersonRepository {
    save(props) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            return yield prisma.person.create({
                data: {
                    firstName: props.firstName,
                    lastName: props.lastName,
                    mobile: (_a = props.mobile) !== null && _a !== void 0 ? _a : null,
                    personTypeId: props.personTypeId,
                },
                include: personInclude,
            });
        });
    }
    findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield prisma.person.findUnique({
                where: { id },
                include: personInclude,
            });
        });
    }
    findByMobile(mobile) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield prisma.person.findFirst({ where: { mobile }, include: personInclude, });
        });
    }
    findAll(filters) {
        return __awaiter(this, void 0, void 0, function* () {
            const { personTypeId, search, page = 1, limit = 20 } = filters;
            const where = Object.assign({ personTypeId: personTypeId }, (search && {
                OR: [
                    { firstName: { contains: search, mode: 'insensitive' } },
                    { lastName: { contains: search, mode: 'insensitive' } },
                ]
            }));
            const [props, total] = yield prisma.$transaction([
                prisma.person.findMany({
                    where,
                    include: personInclude,
                    orderBy: { createdAt: 'desc' },
                    skip: (page - 1) * limit,
                    take: limit,
                }),
                prisma.person.count({ where }),
            ]);
            return { props, total };
        });
    }
    update(id, props) {
        return __awaiter(this, void 0, void 0, function* () {
            yield prisma.person.update({
                where: { id },
                data: props,
            });
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield prisma.person.delete({ where: { id } });
        });
    }
}
//# sourceMappingURL=PrismaPersonRepository.js.map