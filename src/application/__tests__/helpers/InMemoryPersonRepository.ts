import type { IPersonRepository, PersonFilters }              from '../../../domain/repositories/IPersonRepository.js'
import type {
  PersonWithRelations,
  PersonListItem,
  PersonDetailWithRelations,
  CreatePersonProps,
} from '../../../domain/entities/Person/person.types.js'
import type { RepartitionClients, TopClientItem } from '../../../domain/entities/Dashboard/dashboard.types.js'
import type { Person }                            from '@prisma/client'

export class InMemoryPersonRepository implements IPersonRepository {
  private store: PersonWithRelations[] = []

  seed(person: PersonWithRelations): void {
    this.store.push(person)
  }

  reset(): void {
    this.store = []
  }

  async save(props: CreatePersonProps): Promise<PersonWithRelations> {
    const person = {
      id:           crypto.randomUUID(),
      firstName:    props.firstName,
      lastName:     props.lastName,
      mobile:       props.mobile,
      personTypeId: props.personTypeId,
      createdAt:    new Date(),
      personType:   { id: props.personTypeId, name: 'CLIENT', createdAt: new Date() },
      _count:       { packages: 0 },
    } as unknown as PersonWithRelations
    this.store.push(person)
    return person
  }

  async findById(id: string): Promise<PersonWithRelations | null> {
    return this.store.find(p => p.id === id) ?? null
  }

  async findByMobile(mobile: string): Promise<PersonWithRelations | null> {
    return this.store.find(p => p.mobile === mobile) ?? null
  }

  async findDetailById(id: string): Promise<PersonDetailWithRelations | null> {
    return this.store.find(p => p.id === id) as unknown as PersonDetailWithRelations | null
  }

  async findAll(_filters?: PersonFilters): Promise<{ props: PersonListItem[]; total: number }> {
    const items = this.store.map(p => ({ ...p, totalSpent: 0 })) as PersonListItem[]
    return { props: items, total: items.length }
  }

  async update(_id: string, _props: Partial<Person>): Promise<void> { /* noop */ }

  async delete(id: string): Promise<void> {
    this.store = this.store.filter(p => p.id !== id)
  }

  async getTotalClients(): Promise<number> { return this.store.length }
  async getRepartitionClients(): Promise<RepartitionClients> {
    return { GP: 0, CLIENT: 0 } as unknown as RepartitionClients
  }
  async getTopClients(): Promise<TopClientItem[]> { return [] }
}
