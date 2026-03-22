import { IPackageRepository } from "../../domain/repositories/IPackageRepository.js";
import { IDepartureRepository } from "../../domain/repositories/IDepartureRepository.js";
import { Package } from "../../domain/entities/Package/Package.js";
import { DepartureGp } from "../../domain/entities/DepartureGp/DepartureGp.js";
import { PackageStates } from "../../domain/enums/PackageStates.js";
import { DepartureStates } from "../../domain/enums/DepartureStates.js";
import { NotFoundError } from "../../shared/errors/NotFoundError.js";
import { ValidationError } from "../../shared/errors/BadRequestError.js";
import { ErrorsMessages } from "../../shared/messages/ErrorsMessagesFr.js";

export class UpdatePackageStatusUseCase {
  constructor(
    private readonly packageRepo:   IPackageRepository,
    private readonly departureRepo: IDepartureRepository,
  ) {}

  async execute(id: string, state: PackageStates): Promise<void> {
    const row = await this.packageRepo.findById(id);
    if (!row) throw new NotFoundError(ErrorsMessages.COLIS_INTROUVABLE);

    const departure = await this.departureRepo.findById(row.departureGpId);
    if (!departure) throw new NotFoundError(ErrorsMessages.DEPART_INTROUVABLE);

    const departureGp = new DepartureGp(departure);
    if (departureGp.getCurrentState() !== DepartureStates.ARRIVE) {
      throw new ValidationError(ErrorsMessages.COLIS_MODIFICATION_IMPOSSIBLE);
    }

    if (state !== PackageStates.LIVRE && state !== PackageStates.RETOURNE) {
      throw new ValidationError(ErrorsMessages.COLIS_STATUT_INVALIDE);
    }

    const pkg = new Package(row);
    if (pkg.getCurrentStatus() === state) {
      throw new ValidationError(ErrorsMessages.COLIS_STATUT_IDENTIQUE);
    }

    await this.packageRepo.updateStatus(id, state);

    if (state === PackageStates.LIVRE) {
      await this.packageRepo.archive(id);
      console.log(`[AUTO] Colis ${id} archivé automatiquement — statut LIVRE`);
    }
  }
}
