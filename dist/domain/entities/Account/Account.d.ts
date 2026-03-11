import { Account as PrismaAccount } from '@prisma/client';
import { CreateAccountProps, AccountWithRelations } from './account.types.js';
export declare class Account {
    id?: string;
    email: PrismaAccount['email'];
    password: PrismaAccount['password'];
    personId: PrismaAccount['personId'];
    roleId: PrismaAccount['roleId'];
    createdAt?: PrismaAccount['createdAt'];
    role?: AccountWithRelations['role'];
    person?: AccountWithRelations['person'];
    constructor(props: CreateAccountProps | AccountWithRelations);
    getFullName(): string;
    isAdmin(): boolean;
    isClient(): boolean;
}
//# sourceMappingURL=Account.d.ts.map