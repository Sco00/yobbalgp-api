import { IDepartureRepository } from '../../domain/repositories/IDepartureRepository.js'
import { type DepartureWithPackages } from '../../domain/entities/DepartureGp/departure.types.js'
import { NotFoundError } from '../../shared/errors/NotFoundError.js'
import { ErrorsMessages } from '../../shared/messages/ErrorsMessagesFr.js'

export class GetDepartureByIdUseCase {
  constructor(private readonly departureRepo: IDepartureRepository) {}

  async execute(id: string): Promise<DepartureWithPackages> {
    const departure = await this.departureRepo.findById(id)
    if (!departure) throw new NotFoundError(ErrorsMessages.DEPART_INTROUVABLE)
    return departure
  }
}
