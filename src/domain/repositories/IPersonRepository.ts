import { PersonWithRelations, PersonDetailWithRelations, CreatePersonProps } from '../entities/Person/person.types.js'
import { type IRepository } from './IRepository.js'
import { Person } from '@prisma/client'
import { type RepartitionClients, type TopClientItem } from '../entities/Dashboard/dashboard.types.js'

export interface PersonFilters {
  personTypeId?: string
  search?:       string  // recherche sur firstName, lastName ou mobile
  hasPackages?:  boolean
  page?:         number
  limit?:        number
}

export interface IPersonRepository
  extends Omit<IRepository<PersonWithRelations, PersonFilters>, 'save' | 'update'> {
  save(props: CreatePersonProps):                         Promise<PersonWithRelations>
  update(id: string, props: Partial<Person>):           Promise<void>
  findByMobile(mobile: string):                         Promise<PersonWithRelations | null>
  findDetailById(id: string):                           Promise<PersonDetailWithRelations | null>
  findAll(filters: PersonFilters): Promise<{ props: PersonWithRelations[]; total: number }>

  // Dashboard
  getTotalClients():        Promise<number>
  getRepartitionClients():  Promise<RepartitionClients>
  getTopClients():          Promise<TopClientItem[]>
}