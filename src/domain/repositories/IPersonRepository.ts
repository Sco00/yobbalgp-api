import { PersonWithRelations, CreatePersonProps } from '../entities/Person/person.types.js'
import { type IRepository } from './IRepository.js'
import { type CreatePersonDTO } from '../../infrastructure/http/validators/person.validator.js'
import { Person } from '@prisma/client'

export interface PersonFilters {
  personTypeId?: string
  search?:       string  // recherche sur firstName ou lastName
  page?:         number
  limit?:        number
}

export interface IPersonRepository
  extends Omit<IRepository<PersonWithRelations, PersonFilters>, 'save' | 'update'> {
  save(props: CreatePersonProps):                    Promise<PersonWithRelations>
  update(id: string, props: Partial<Person>):      Promise<void>
  findByMobile(mobile: string):                    Promise<PersonWithRelations | null>
  findAll(filters: PersonFilters): Promise<{ props: PersonWithRelations[]; total: number }>;

}