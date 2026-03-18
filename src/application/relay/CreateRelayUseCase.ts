import { type IRelayRepository } from '../../domain/repositories/IRelayRepository.js'
import { type RelayWithRelations } from '../../domain/entities/Relay/relay.types.js'
import { type CreateRelayDTO } from '../../infrastructure/http/validators/relay.validator.js'
import { ConflictError } from '../../shared/errors/ConflictError.js'
import { ErrorsMessages } from '../../shared/messages/ErrorsMessagesFr.js'

export class CreateRelayUseCase {
  constructor(private readonly relayRepo: IRelayRepository) {}

  async execute(dto: CreateRelayDTO): Promise<RelayWithRelations> {
    const existing = await this.relayRepo.findByAddressId(dto.addressId)
    if (existing) throw new ConflictError(ErrorsMessages.RELAIS_DEJA_EXISTANT)

    return await this.relayRepo.save(dto)
  }
}