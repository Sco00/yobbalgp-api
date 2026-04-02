import { AccountWithRelations }  from '../entities/Account/account.types.js'
import { type IRepository }      from './IRepository.js'
import { type CreateAccountInput } from '../../application/dtos/account.dtos.js'

export interface IAccountRepository
  extends Omit<IRepository<AccountWithRelations, never>, 'save' | 'update' | 'findAll'> {
  save(props: CreateAccountInput): Promise<AccountWithRelations>
  findByEmail(email: string): Promise<AccountWithRelations | null>
}