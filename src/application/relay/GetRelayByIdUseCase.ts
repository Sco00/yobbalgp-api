import { type IRelayRepository } from '../../domain/repositories/IRelayRepository.js'
import { type RelayDetailWithRelations } from '../../domain/entities/Relay/relay.types.js'
import { NotFoundError } from '../../shared/errors/NotFoundError.js'
import { ErrorsMessages } from '../../shared/messages/ErrorsMessagesFr.js'

export class GetRelayByIdUseCase {
  constructor(private readonly relayRepo: IRelayRepository) {}

  async execute(id: string): Promise<RelayDetailWithRelations> {
    const relay = await this.relayRepo.findDetailById(id)
    if (!relay) throw new NotFoundError(ErrorsMessages.RELAIS_INTROUVABLE)
    return relay
  }
}