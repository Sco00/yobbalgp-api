import type { IAccountRepository }    from '../../../domain/repositories/IAccountRepository.js'
import type { AccountWithRelations }   from '../../../domain/entities/Account/account.types.js'
import type { CreateAccountInput }     from '../../dtos/account.dtos.js'

export class InMemoryAccountRepository implements IAccountRepository {
  private store: AccountWithRelations[] = []

  /** Pré-charge un compte (données de test, password déjà hashé) */
  seed(account: AccountWithRelations): void {
    this.store.push(account)
  }

  reset(): void {
    this.store = []
  }

  async save(props: CreateAccountInput): Promise<AccountWithRelations> {
    const account = {
      id:       crypto.randomUUID(),
      email:    props.email,
      password: props.password,
      roleId:   props.roleId,
      personId: props.personId,
      createdAt: new Date(),
      role:   { id: props.roleId, name: 'CLIENT', createdAt: new Date() },
      person: {
        id: props.personId, firstName: '', lastName: '',
        mobile: '', personTypeId: '', createdAt: new Date(), personType: {},
      },
    } as unknown as AccountWithRelations
    this.store.push(account)
    return account
  }

  async findById(id: string): Promise<AccountWithRelations | null> {
    return this.store.find(a => a.id === id) ?? null
  }

  async findByEmail(email: string): Promise<AccountWithRelations | null> {
    return this.store.find(a => a.email === email) ?? null
  }

  async delete(id: string): Promise<void> {
    this.store = this.store.filter(a => a.id !== id)
  }
}
