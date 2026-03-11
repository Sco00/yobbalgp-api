import { type Person as PrismaPerson } from '@prisma/client';
import { type CreatePersonDTO } from '../../../../infrastructure/http/validators/person.validator.js';
type SystemFields = {
    id?: string;
    createdAt?: Date;
};
export type CreatePersonProps = CreatePersonDTO & SystemFields;
export declare class Person {
    id?: PrismaPerson['id'];
    firstName: PrismaPerson['firstName'];
    lastName: PrismaPerson['lastName'];
    mobile: PrismaPerson['mobile'];
    personTypeId: PrismaPerson['personTypeId'];
    createdAt?: PrismaPerson['createdAt'];
    constructor(props: CreatePersonProps | PrismaPerson);
    getFullName(): string;
}
export {};
//# sourceMappingURL=person.types.d.ts.map