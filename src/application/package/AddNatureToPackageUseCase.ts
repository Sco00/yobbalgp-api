import { Package } from "../../domain/entities/Package/Package.js"
import { INatureRepository } from "../../domain/repositories/INatureRepository.js"
import { IPackageRepository } from "../../domain/repositories/IPackageRepository.js"
import { PackageNaturesDTO } from "../../infrastructure/http/validators/package.validators.js"
import { ValidationError } from "../../shared/errors/BadRequestError.js"
import { NotFoundError } from "../../shared/errors/NotFoundError.js"
import { ErrorsMessages } from "../../shared/messages/ErrorsMessagesFr.js"

export class AddNatureToPackageUseCase {
  constructor(
    private readonly packageRepo: IPackageRepository,
    private readonly natureRepo:  INatureRepository,
  ) {}

  async execute(packageId: string, input: PackageNaturesDTO): Promise<void> {
    const row = await this.packageRepo.findById(packageId)
    if (!row) throw new NotFoundError(ErrorsMessages.COLIS_INTROUVABLE)

    const pkg = new Package(row)

    if (pkg.isArchived) throw new ValidationError(ErrorsMessages.COLIS_DEJA_ARCHIVE)
    if (!pkg.canBeDeleted()) throw new ValidationError(ErrorsMessages.COLIS_NON_SUPPRIMABLE)

    const nature = await this.natureRepo.findById(input.natureId)
    if (!nature) throw new NotFoundError(ErrorsMessages.NATURE_INTROUVABLE)

    const price = nature.unitPrice === 0
      ? row.departureGp.price * input.quantity
      : nature.unitPrice * input.quantity

    await this.packageRepo.addNature(packageId, {
      natureId: input.natureId,
      quantity: input.quantity,
      price,
    })
  }
}