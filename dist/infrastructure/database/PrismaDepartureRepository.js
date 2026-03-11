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
const departureInclude = {
    currency: true,
    departureAddress: true,
    destinationAddress: true,
    person: true,
    creator: true,
    packages: true,
};
export class PrismaDepartureRepository {
    save(props) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, _b;
            return yield prisma.departureGp.create({
                data: {
                    departureDate: props.departureDate,
                    deadline: props.deadline,
                    price: props.price,
                    priceGp: props.priceGp,
                    currencyId: props.currencyId,
                    departureAddressId: props.departureAddressId,
                    destinationAddressId: props.destinationAddressId,
                    personId: (_a = props.personId) !== null && _a !== void 0 ? _a : null,
                    creatorId: props.creatorId,
                    insurancePrice: (_b = props.insurancePrice) !== null && _b !== void 0 ? _b : null,
                },
                include: departureInclude,
            });
        });
    }
    findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield prisma.departureGp.findUnique({ where: { id }, include: departureInclude });
        });
    }
    findAll() {
        return __awaiter(this, arguments, void 0, function* (filters = { page: 1, limit: 20 }) {
            const { departureCity, destinationCity, currencyId, isClosed, departureDateFrom, page, limit, } = filters;
            const where = Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({}, (currencyId !== undefined && { currencyId })), (isClosed !== undefined && { isClosed })), (departureCity && { departureAddress: { city: departureCity } })), (destinationCity && { destinationAddress: { city: destinationCity } })), ((departureDateFrom) && {
                departureDate: Object.assign({}, (departureDateFrom && { gte: departureDateFrom })),
            }));
            const [data, total] = yield prisma.$transaction([
                prisma.departureGp.findMany({
                    where,
                    include: departureInclude,
                    orderBy: { departureDate: 'desc' },
                    skip: (page - 1) * limit,
                    take: limit,
                }),
                prisma.departureGp.count({ where }),
            ]);
            return { props: data, total };
        });
    }
    update(id, props) {
        return __awaiter(this, void 0, void 0, function* () {
            yield prisma.departureGp.update({ where: { id }, data: props });
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield prisma.departureGp.delete({ where: { id } });
        });
    }
    close(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield prisma.departureGp.update({ where: { id }, data: { isClosed: true } });
        });
    }
}
//# sourceMappingURL=PrismaDepartureRepository.js.map