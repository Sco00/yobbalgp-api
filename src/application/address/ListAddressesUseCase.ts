import { type IAddressRepository, type AddressFilters } from '../../domain/repositories/IAddressRepository.js'
import { type AddressWithRelations }                     from '../../domain/entities/Address/address.types.js'

interface ListAddressesResult {
  props:  AddressWithRelations[]
  total: number
  page:  number
  limit: number
}

export class ListAddressesUseCase {
  constructor(private readonly addressRepository: IAddressRepository) {}

  async execute(filters: AddressFilters): Promise<ListAddressesResult> {
    const { props, total } = await this.addressRepository.findAll(filters)
    return {
      props,
      total,
      page:  filters.page  ?? 1,
      limit: filters.limit ?? 10,
    }
  }
}
