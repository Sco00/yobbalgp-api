import { IAccountRepository } from '../../domain/repositories/IAccountRepository.js';
import { AccountWithRelations, CreateAccountProps } from '../../domain/entities/Account/account.types.js';
export declare class PrismaAccountRepository implements IAccountRepository {
    save(props: CreateAccountProps): Promise<AccountWithRelations>;
    findById(id: string): Promise<AccountWithRelations | null>;
    findByEmail(email: string): Promise<AccountWithRelations | null>;
    update(id: string, props: Partial<CreateAccountProps>): Promise<AccountWithRelations>;
    delete(id: string): Promise<void>;
}
//# sourceMappingURL=PrismaAccountRepository.d.ts.map