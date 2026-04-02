import { type DepartureWithRelations, type DepartureWithPackages, type DepartureListItem, type CreateDepartureProps } from '../entities/DepartureGp/departure.types.js'
import { type DepartureStates } from '../enums/DepartureStates.js'
import { IRepository } from './IRepository.js'

export interface DepartureFilters {
  departureCountry?:   string | undefined
  destinationCountry?: string | undefined
  currencyId?:         string | undefined
  isClosed?:           boolean | undefined
  departureDateFrom?:  Date | undefined
  search?:             string | undefined
  page:                number
  limit:               number
}

export interface IDepartureRepository extends Omit<IRepository<DepartureWithRelations, DepartureFilters>, 'save' | 'findAll' | 'findById'> {
  save(props: CreateDepartureProps):                                          Promise<DepartureWithRelations>
  findById(id: string):                                                       Promise<DepartureWithPackages | null>
  findAll(filters?: DepartureFilters): Promise<{ props: DepartureListItem[]; total: number }>
  close(id: string):                                                          Promise<void>
  updateState(id: string, state: DepartureStates):                           Promise<void>
}
