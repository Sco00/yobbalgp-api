import { IDepartureRepository } from '../../domain/repositories/IDepartureRepository.js'
import { type DepartureWithRelations, type CreateDepartureProps } from '../../domain/entities/DepartureGp/departure.types.js'
import { DepartureStates } from '../../domain/enums/DepartureStates.js'
import { ValidationError } from '../../shared/errors/BadRequestError.js'
import { ErrorsMessages } from '../../shared/messages/ErrorsMessagesFr.js'
import { type CreateDepartureDTO } from '../../infrastructure/http/validators/departure.validator.js'
import { scheduleDepartureJobs } from '../../infrastructure/jobs/queues/departure.queue.js'

interface CreateDepartureInput extends CreateDepartureDTO {
  creatorId: string
}

export class CreateDepartureUseCase {
  constructor(private readonly departureRepo: IDepartureRepository) {}

  async execute(input: CreateDepartureInput): Promise<DepartureWithRelations> {
    if (input.deadline >= input.departureDate) {
      throw new ValidationError(ErrorsMessages.DEPART_DEADLINE_INVALIDE)
    }

    const props: CreateDepartureProps = { ...input, creatorId: input.creatorId }

    const departure = await this.departureRepo.save(props)

    // Statut initial EN_ATTENTE
    await this.departureRepo.updateState(departure.id, DepartureStates.EN_ATTENTE)

    // Planifier EN_TRANSIT à departureDate et ARRIVE à arrivalDate
    await scheduleDepartureJobs(
      departure.id,
      new Date(departure.departureDate),
      new Date(departure.arrivalDate),
    )

    return departure
  }
}
