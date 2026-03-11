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
const packageInclude = {
    person: true,
    creator: true,
    relay: true,
    departureGp: true,
    natures: { include: { nature: true } },
    statuses: { orderBy: { createdAt: 'desc' } },
};
export class PrismaPackageRepository {
    save(props) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            return yield prisma.package.create({
                data: {
                    reference: props.reference,
                    weight: props.weight,
                    creatorId: props.creatorId,
                    personId: props.personId,
                    relayId: (_a = props.relayId) !== null && _a !== void 0 ? _a : null,
                    departureGpId: props.departureGpId,
                    natures: {
                        create: props.packageNatures.map(n => ({
                            natureId: n.natureId,
                            quantity: n.quantity,
                            price: n.price,
                        }))
                    },
                    statuses: {
                        create: {}
                    }
                },
                include: packageInclude,
            });
        });
    }
    findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield prisma.package.findUnique({
                where: { id },
                include: packageInclude,
            });
        });
    }
    findAll() {
        return __awaiter(this, arguments, void 0, function* (filters = { page: 1, limit: 20 }) {
            const { state, departureDateFrom, departureCountry, destinationCountry, currencyId, page, limit, } = filters;
            const departureGpFilter = Object.assign(Object.assign(Object.assign(Object.assign({}, (currencyId && { currencyId })), (departureDateFrom && { departureDate: { gte: departureDateFrom } })), (departureCountry && { departureAddress: { country: departureCountry } })), (destinationCountry && { destinationAddress: { country: destinationCountry } }));
            const where = Object.assign(Object.assign({}, (state && { statuses: { some: { state } } })), (Object.keys(departureGpFilter).length > 0 && { departureGp: departureGpFilter }));
            const [data, total] = yield prisma.$transaction([
                prisma.package.findMany({
                    where,
                    include: packageInclude,
                    orderBy: { createdAt: 'desc' },
                    skip: (page - 1) * limit,
                    take: limit,
                }),
                prisma.package.count({ where }),
            ]);
            return { props: data, total };
        });
    }
    updateStatus(packageId, state) {
        return __awaiter(this, void 0, void 0, function* () {
            yield prisma.packageStatus.create({
                data: { packageId, state }
            });
        });
    }
    archive(packageId) {
        return __awaiter(this, void 0, void 0, function* () {
            yield prisma.package.update({
                where: { id: packageId },
                data: { isArchived: true }
            });
        });
    }
    delete(packageId) {
        return __awaiter(this, void 0, void 0, function* () {
            yield prisma.package.delete({
                where: { id: packageId }
            });
        });
    }
    getLastReference() {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            const last = yield prisma.package.findFirst({
                orderBy: { createdAt: 'desc' },
                select: { reference: true },
            });
            return (_a = last === null || last === void 0 ? void 0 : last.reference) !== null && _a !== void 0 ? _a : null;
        });
    }
}
//# sourceMappingURL=PrismaPackageRepository.js.map