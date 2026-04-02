import { type IRelayRepository }  from '../../domain/repositories/IRelayRepository.js'
import { type RelayWithRelations } from '../../domain/entities/Relay/relay.types.js'
import { type CreateRelayInput }   from '../dtos/relay.dtos.js'
import { ConflictError }           from '../../shared/errors/ConflictError.js'
import { ErrorsMessages }          from '../../shared/messages/ErrorsMessagesFr.js'

export class CreateRelayUseCase {
  constructor(private readonly relayRepo: IRelayRepository) {}

  async execute(dto: CreateRelayInput): Promise<RelayWithRelations> {
    const existing = await this.relayRepo.findByAddressId(dto.addressId)
    if (existing) throw new ConflictError(ErrorsMessages.RELAIS_DEJA_EXISTANT)

    return await this.relayRepo.save(dto)
  }
}
