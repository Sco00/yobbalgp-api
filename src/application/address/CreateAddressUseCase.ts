import { type IAddressRepository }  from '../../domain/repositories/IAddressRepository.js'
import { type AddressWithRelations } from '../../domain/entities/Address/address.types.js'
import { type CreateAddressInput }   from '../dtos/address.dtos.js'
import { type CreateAddressProps }   from '../../domain/entities/Address/address.types.js'
import { ConflictError }             from '../../shared/errors/ConflictError.js'
import { ErrorsMessages }            from '../../shared/messages/ErrorsMessagesFr.js'

export class CreateAddressUseCase {
  constructor(private readonly addressRepository: IAddressRepository) {}

  async execute(dto: CreateAddressInput): Promise<AddressWithRelations> {
    const addressHash = [
      dto.country, dto.region, dto.city, dto.locality ?? '', dto.type,
    ].join('-').toUpperCase().replace(/\s+/g, '_')

    const existing = await this.addressRepository.findByHash(addressHash)
    if (existing) throw new ConflictError(ErrorsMessages.ADRESSE_DEJA_EXISTANTE)

    const props: CreateAddressProps = { ...dto, addressHash }
    return this.addressRepository.save(props)
  }
}
