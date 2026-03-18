import { IDepartureRepository } from '../../domain/repositories/IDepartureRepository.js'
import { type DepartureWithRelations, type CreateDepartureProps } from '../../domain/entities/DepartureGp/departure.types.js'
import { ValidationError } from '../../shared/errors/BadRequestError.js'
import { ErrorsMessages } from '../../shared/messages/ErrorsMessagesFr.js'
import { type CreateDepartureDTO } from '../../infrastructure/http/validators/departure.validator.js'
import { scheduleDepartureClose } from '../../infrastructure/jobs/queues/departure.queue.js'

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
    await scheduleDepartureClose(departure.id, new Date(departure.departureDate))
    return departure
  }
}
