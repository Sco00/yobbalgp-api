import { type IDepartureRepository } from '../../domain/repositories/IDepartureRepository.js'

export class AutoCloseDepartureUseCase {
  constructor(private readonly departureRepo: IDepartureRepository) {}

  async execute(departureId: string): Promise<void> {
    const departure = await this.departureRepo.findById(departureId)
    if (!departure || departure.isClosed) return

    await this.departureRepo.close(departureId)
  }
}
