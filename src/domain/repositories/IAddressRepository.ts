import { type IRepository }          from './IRepository.js'
import { type AddressWithRelations, type AddressDetailWithRelations, type CreateAddressProps } from '../entities/Address/address.types.js'

export interface AddressFilters {
  search?:  string | undefined
  country?: string | undefined
  region?:  string | undefined
  city?:    string | undefined
  type?:    'SIMPLE' | 'RELAIS' | undefined
  page?:    number
  limit?:   number
}

export interface IAddressRepository
  extends Omit<IRepository<AddressWithRelations, AddressFilters>, 'save' | 'update'> {
  save(props: CreateAddressProps):                        Promise<AddressWithRelations>
  update(id: string, props: Partial<CreateAddressProps>): Promise<AddressWithRelations>
  findByHash(addressHash: string):                        Promise<AddressWithRelations | null>
  findDetailById(id: string):                             Promise<AddressDetailWithRelations | null>
}
