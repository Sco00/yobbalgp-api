import { type IRelayRepository } from '../../domain/repositories/IRelayRepository.js'
import { type RelayWithRelations } from '../../domain/entities/Relay/relay.types.js'
import { NotFoundError } from '../../shared/errors/NotFoundError.js'
import { ErrorsMessages } from '../../shared/messages/ErrorsMessagesFr.js'

export class GetRelayByIdUseCase {
  constructor(private readonly relayRepo: IRelayRepository) {}

  async execute(id: string): Promise<RelayWithRelations> {
    const relay = await this.relayRepo.findById(id)
    if (!relay) throw new NotFoundError(ErrorsMessages.RELAIS_INTROUVABLE)
    return relay
  }
}