import { type IRepository } from './IRepository.js'
import { type RelayWithRelations, type RelayDetailWithRelations, type CreateRelayProps } from '../entities/Relay/relay.types.js'

export interface RelayFilters {
  search?:  string | undefined
  country?: string | undefined
  region?:  string | undefined
  city?:    string | undefined
  page?:    number | undefined
  limit?:   number | undefined
}

export interface IRelayRepository
  extends Omit<IRepository<RelayWithRelations, RelayFilters>, 'save' | 'update'> {
  save(props: CreateRelayProps):                        Promise<RelayWithRelations>
  update(id: string, props: Partial<CreateRelayProps>): Promise<RelayWithRelations>
  findByAddressId(addressId: string):                   Promise<RelayWithRelations | null>
  findDetailById(id: string):                           Promise<RelayDetailWithRelations | null>
}