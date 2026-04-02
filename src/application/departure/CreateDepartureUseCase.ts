import { type IDepartureRepository }   from '../../domain/repositories/IDepartureRepository.js'
import { type IJobScheduler }          from '../services/IJobScheduler.js'
import { type CreateDepartureInput }   from '../dtos/departure.dtos.js'
import { type DepartureWithRelations } from '../../domain/entities/DepartureGp/departure.types.js'
import { DepartureStates }             from '../../domain/enums/DepartureStates.js'
import { ValidationError }             from '../../shared/errors/BadRequestError.js'
import { ErrorsMessages }              from '../../shared/messages/ErrorsMessagesFr.js'

export class CreateDepartureUseCase {
  constructor(
    private readonly departureRepo: IDepartureRepository,
    private readonly jobScheduler:  IJobScheduler,
  ) {}

  async execute(input: CreateDepartureInput): Promise<DepartureWithRelations> {
    if (input.deadline >= input.departureDate) {
      throw new ValidationError(ErrorsMessages.DEPART_DEADLINE_INVALIDE)
    }

    const departure = await this.departureRepo.save(input)

    await this.departureRepo.updateState(departure.id, DepartureStates.EN_ATTENTE)

    await this.jobScheduler.scheduleDepartureJobs(
      departure.id,
      new Date(departure.departureDate),
      new Date(departure.arrivalDate),
      new Date(departure.deadline),
    )

    return departure
  }
}
