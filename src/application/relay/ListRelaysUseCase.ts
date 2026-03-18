import { type IRelayRepository, type RelayFilters } from '../../domain/repositories/IRelayRepository.js'
import { type RelayWithRelations } from '../../domain/entities/Relay/relay.types.js'

interface ListRelaysResult {
  props:  RelayWithRelations[]
  total: number
  page:  number
  limit: number
}

export class ListRelaysUseCase {
  constructor(private readonly relayRepo: IRelayRepository) {}

  async execute(filters: RelayFilters): Promise<ListRelaysResult> {
    const { props, total } = await this.relayRepo.findAll(filters)
    return { props, total, page: filters.page ?? 1, limit: filters.limit ?? 20 }
  }
}