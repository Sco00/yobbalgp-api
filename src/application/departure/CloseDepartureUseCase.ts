import { IDepartureRepository } from '../../domain/repositories/IDepartureRepository.js'
import { DepartureGp } from '../../domain/entities/DepartureGp/DepartureGp.js'
import { NotFoundError } from '../../shared/errors/NotFoundError.js'
import { ValidationError } from '../../shared/errors/BadRequestError.js'
import { ErrorsMessages } from '../../shared/messages/ErrorsMessagesFr.js'

export class CloseDepartureUseCase {
  constructor(private readonly departureRepo: IDepartureRepository) {}

  async execute(id: string): Promise<void> {
    const departure = await this.departureRepo.findById(id)
    if (!departure) throw new NotFoundError(ErrorsMessages.DEPART_INTROUVABLE)

    const departureGp = new DepartureGp(departure)
    if (!departureGp.canBeClosed()) {
      throw new ValidationError(ErrorsMessages.DEPART_DEJA_FERME)
    }

    await this.departureRepo.close(id)
  }
}
