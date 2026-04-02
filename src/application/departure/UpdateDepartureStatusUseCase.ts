import { type IDepartureRepository } from '../../domain/repositories/IDepartureRepository.js'
import { type IPackageRepository } from '../../domain/repositories/IPackageRepository.js'
import { DepartureGp } from '../../domain/entities/DepartureGp/DepartureGp.js'
import { DepartureStates } from '../../domain/enums/DepartureStates.js'
import { PackageStates } from '../../domain/enums/PackageStates.js'
import { NotFoundError } from '../../shared/errors/NotFoundError.js'
import { ValidationError } from '../../shared/errors/BadRequestError.js'
import { ErrorsMessages } from '../../shared/messages/ErrorsMessagesFr.js'

const ALLOWED_TRANSITIONS: Record<DepartureStates, DepartureStates | null> = {
  [DepartureStates.EN_ATTENTE]: DepartureStates.EN_TRANSIT,
  [DepartureStates.EN_TRANSIT]: DepartureStates.ARRIVE,
  [DepartureStates.ARRIVE]:     null,
}

const DEPARTURE_TO_PACKAGE_STATE: Partial<Record<DepartureStates, PackageStates>> = {
  [DepartureStates.EN_TRANSIT]: PackageStates.EN_TRANSIT,
  [DepartureStates.ARRIVE]:     PackageStates.ARRIVE,
}

export class UpdateDepartureStatusUseCase {
  constructor(
    private readonly departureRepo: IDepartureRepository,
    private readonly packageRepo:   IPackageRepository,
  ) {}

  async execute(departureId: string, newState: DepartureStates): Promise<void> {
    const row = await this.departureRepo.findById(departureId)
    if (!row) throw new NotFoundError(ErrorsMessages.DEPART_INTROUVABLE)

    const departure = new DepartureGp(row)
    const currentState = departure.getCurrentState()

    if (currentState === newState) {
      throw new ValidationError(ErrorsMessages.DEPART_STATUT_IDENTIQUE)
    }

    if (ALLOWED_TRANSITIONS[currentState] !== newState) {
      throw new ValidationError(ErrorsMessages.DEPART_TRANSITION_INVALIDE)
    }

    await this.departureRepo.updateState(departureId, newState)

    const packageState = DEPARTURE_TO_PACKAGE_STATE[newState]
    if (packageState) {
      await Promise.all(
        row.packages.map((pkg) => this.packageRepo.updateStatus(pkg.id, packageState))
      )
    }
  }
}
