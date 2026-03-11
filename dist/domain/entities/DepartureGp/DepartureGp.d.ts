import { type DepartureGp as PrismaDepartureGp } from '@prisma/client';
import { type CreateDepartureProps, type DepartureWithRelations } from './departure.types.js';
export declare class DepartureGp {
    id?: PrismaDepartureGp['id'];
    departureDate: PrismaDepartureGp['departureDate'];
    deadline: PrismaDepartureGp['deadline'];
    arrivalDate?: PrismaDepartureGp['arrivalDate'];
    price: PrismaDepartureGp['price'];
    priceGp: PrismaDepartureGp['priceGp'];
    currencyId: PrismaDepartureGp['currencyId'];
    departureAddressId: PrismaDepartureGp['departureAddressId'];
    destinationAddressId: PrismaDepartureGp['destinationAddressId'];
    personId?: PrismaDepartureGp['personId'];
    creatorId: PrismaDepartureGp['creatorId'];
    insurancePrice?: PrismaDepartureGp['insurancePrice'];
    isClosed: PrismaDepartureGp['isClosed'];
    createdAt?: PrismaDepartureGp['createdAt'];
    currency?: DepartureWithRelations['currency'];
    departureAddress?: DepartureWithRelations['departureAddress'];
    destinationAddress?: DepartureWithRelations['destinationAddress'];
    person?: DepartureWithRelations['person'];
    creator?: DepartureWithRelations['creator'];
    packages?: DepartureWithRelations['packages'];
    constructor(props: CreateDepartureProps | DepartureWithRelations);
    canBeClosed(): boolean;
    isDeadlinePassed(): boolean;
    canAddPackage(): boolean;
}
//# sourceMappingURL=DepartureGp.d.ts.map