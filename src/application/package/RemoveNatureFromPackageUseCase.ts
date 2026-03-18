import { Package } from "../../domain/entities/Package/Package.js"
import { IPackageRepository } from "../../domain/repositories/IPackageRepository.js"
import { ValidationError } from "../../shared/errors/BadRequestError.js"
import { NotFoundError } from "../../shared/errors/NotFoundError.js"
import { ErrorsMessages } from "../../shared/messages/ErrorsMessagesFr.js"

export class RemoveNatureFromPackageUseCase {
  constructor(private readonly packageRepo: IPackageRepository) {}

  async execute(packageId: string, natureId: string): Promise<void> {
    // 1. Vérifier que le colis existe
    const row = await this.packageRepo.findById(packageId)
    if (!row) throw new NotFoundError(ErrorsMessages.COLIS_INTROUVABLE)

    const pkg = new Package(row)

    // 2. Vérifier que le colis peut être modifié
    if (pkg.isArchived) throw new ValidationError(ErrorsMessages.COLIS_DEJA_ARCHIVE)
    if (!pkg.canBeDeleted()) throw new ValidationError(ErrorsMessages.COLIS_NON_SUPPRIMABLE)

    // 3. Vérifier qu'il restera au moins une nature
    if ((pkg.natures?.length ?? 0) <= 1) {
      throw new ValidationError(ErrorsMessages.COLIS_NATURE_OBLIGATOIRE)
    }

    // 4. Supprimer la nature
    await this.packageRepo.removeNature(packageId, natureId)
  }
}