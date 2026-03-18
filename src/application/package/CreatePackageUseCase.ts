import {  IPackageRepository } from "../../domain/repositories/IPackageRepository.js" 
import { IDepartureRepository } from "../../domain/repositories/IDepartureRepository.js" 
import { CreatePackageProps, PackageWithRelations } from "../../domain/entities/Package/package.types.js" 
import { PackageStates } from "../../domain/enums/PackageStates.js" 
import { NotFoundError } from "../../shared/errors/NotFoundError.js" 
import { ValidationError } from "../../shared/errors/BadRequestError.js"
import { ErrorsMessages } from "../../shared/messages/ErrorsMessagesFr.js"
import { CreatePackageDTO } from "../../infrastructure/http/validators/package.validators.js" 
import { generateReference } from "../../shared/utils/generateReference.js"
import { INatureRepository } from "../../domain/repositories/INatureRepository.js"
import { schedulePackageDeletion } from '../../infrastructure/jobs/queues/package.queue.js'

interface CreatePackageInput extends CreatePackageDTO {
  creatorId: string
}

export class CreatePackageUseCase {
  constructor(
    private readonly packageRepo:   IPackageRepository,
    private readonly departureRepo: IDepartureRepository,
    private readonly natureRepo: INatureRepository,
  ) {}

  async execute(input: CreatePackageInput): Promise<PackageWithRelations> {
    const departure = await this.departureRepo.findById(input.departureGpId)
    if (!departure) {
      throw new NotFoundError(ErrorsMessages.DEPART_INTROUVABLE)
    }
    if (departure.isClosed) {
      throw new ValidationError(ErrorsMessages.DEPART_FERME)
    }

    const naturesWithPrice = await Promise.all(
      input.packageNatures.map(async n => {
        const nature = await this.natureRepo.findById(n.natureId)
        if (!nature) throw new NotFoundError(ErrorsMessages.NATURE_INTROUVABLE)
        return {
          natureId: n.natureId,
          quantity: n.quantity,
          price:    nature.unitPrice * n.quantity,
        }
      })
    )

    const lastReference = await this.packageRepo.getLastReference()
    const reference     = generateReference(lastReference)

    const props: CreatePackageProps = {
      ...input,
      reference,
      packageNatures: naturesWithPrice
    }

    const pkg = await this.packageRepo.save(props)
    await schedulePackageDeletion(pkg.id, new Date(pkg.departureGp.departureDate))
    return pkg
  }
}