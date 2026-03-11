import { AccountWithRelations } from '../entities/Account/account.types.js';
import { type IRepository } from './IRepository.js';
import { type CreateAccountDTO } from '../../infrastructure/http/validators/account.validator.js';
export interface IAccountRepository extends Omit<IRepository<AccountWithRelations, never>, 'save' | 'update' | 'findAll'> {
    save(props: CreateAccountDTO): Promise<AccountWithRelations>;
    findByEmail(email: string): Promise<AccountWithRelations | null>;
}
//# sourceMappingURL=IAccountRepository.d.ts.map