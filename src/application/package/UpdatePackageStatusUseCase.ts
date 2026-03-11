import { IPackageRepository } from "../../domain/repositories/IPackageRepository.js";
import { Package } from "../../domain/entities/Package/Package.js";
import { type PackageStates } from "../../domain/enums/PackageStates.js";
import { NotFoundError } from "../../shared/errors/NotFoundError.js";
import { ValidationError } from "../../shared/errors/BadRequestError.js";
import { ErrorsMessages } from "../../shared/messages/ErrorsMessagesFr.js";

export class UpdatePackageStatusUseCase {
  constructor(private readonly packageRepo: IPackageRepository) {}

  async execute(id: string, state: PackageStates): Promise<void> {
    const row = await this.packageRepo.findById(id);
    if (!row) throw new NotFoundError(ErrorsMessages.COLIS_INTROUVABLE);

    const pkg = new Package(row);

    if (pkg.getCurrentStatus() === state) {
      throw new ValidationError(ErrorsMessages.COLIS_STATUT_IDENTIQUE);
    }

    await this.packageRepo.updateStatus(id, state);
  }
}
