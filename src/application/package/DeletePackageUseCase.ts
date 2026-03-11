import { IPackageRepository } from '../../domain/repositories/IPackageRepository.js'
import { Package } from '../../domain/entities/Package/Package.js'
import { NotFoundError } from '../../shared/errors/NotFoundError.js'
import { ValidationError } from '../../shared/errors/BadRequestError.js'
import { ErrorsMessages } from '../../shared/messages/ErrorsMessagesFr.js'

export class DeletePackageUseCase {
  constructor(private readonly packageRepo: IPackageRepository) {}

  async execute(id: string): Promise<void> {
    const row = await this.packageRepo.findById(id)
    if (!row) throw new NotFoundError(ErrorsMessages.COLIS_INTROUVABLE)

    const pkg = new Package(row)

    if (!pkg.canBeDeleted()) {
      throw new ValidationError(ErrorsMessages.COLIS_NON_SUPPRIMABLE)
    }

    await this.packageRepo.delete(id)
  }
}