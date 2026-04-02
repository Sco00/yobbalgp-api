import { type IAddressRepository } from '../../domain/repositories/IAddressRepository.js'
import { type AddressDetailWithRelations } from '../../domain/entities/Address/address.types.js'
import { NotFoundError }             from '../../shared/errors/NotFoundError.js'
import { ErrorsMessages }            from '../../shared/messages/ErrorsMessagesFr.js'

export class GetAddressByIdUseCase {
  constructor(private readonly addressRepository: IAddressRepository) {}

  async execute(id: string): Promise<AddressDetailWithRelations> {
    const address = await this.addressRepository.findDetailById(id)
    if (!address) throw new NotFoundError(ErrorsMessages.ADRESSE_INTROUVABLE)
    return address
  }
}
