import { type DepartureWithRelations, type CreateDepartureProps } from '../entities/DepartureGp/departure.types.js'
import { IRepository } from './IRepository.js'

export interface DepartureFilters {
  departureCity?:   string | undefined
  destinationCity?: string | undefined
  currencyId?:         string | undefined
  isClosed?:           boolean | undefined
  departureDateFrom?:  Date | undefined
  page:                number
  limit:               number
}

export interface IDepartureRepository extends Omit<IRepository<DepartureWithRelations, DepartureFilters>, 'save'> {
  save(props: CreateDepartureProps): Promise<DepartureWithRelations>
  findById(id: string): Promise<DepartureWithRelations | null>
  findAll(filters?: DepartureFilters): Promise<{ props: DepartureWithRelations[]; total: number }>
  close(id: string): Promise<void>
}
