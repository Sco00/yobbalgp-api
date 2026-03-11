import { type Person as PrismaPerson } from '@prisma/client';
import { CreatePersonProps, PersonWithRelations } from './person.types.js';
export declare class Person {
    id?: string;
    firstName: PrismaPerson['firstName'];
    lastName: PrismaPerson['lastName'];
    mobile: PrismaPerson['mobile'];
    personTypeId: PrismaPerson['personTypeId'];
    createdAt?: PrismaPerson['createdAt'];
    personType?: PersonWithRelations['personType'];
    account?: PersonWithRelations['account'];
    constructor(props: CreatePersonProps | PersonWithRelations);
    getFullName(): string;
    hasAccount(): boolean;
}
//# sourceMappingURL=Person.d.ts.map