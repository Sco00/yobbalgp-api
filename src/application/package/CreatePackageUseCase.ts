import { type IPackageRepository }    from '../../domain/repositories/IPackageRepository.js'
import { type IDepartureRepository }  from '../../domain/repositories/IDepartureRepository.js'
import { type IPaymentRepository }    from '../../domain/repositories/IPaymentRepository.js'
import { type INatureRepository }     from '../../domain/repositories/INatureRepository.js'
import { type IPersonRepository }     from '../../domain/repositories/IPersonRepository.js'
import { type IJobScheduler }         from '../services/IJobScheduler.js'
import { type CreatePackageInput }    from '../dtos/package.dtos.js'
import { type CreatePackageProps, type PackageWithRelations } from '../../domain/entities/Package/package.types.js'
import { NotFoundError }              from '../../shared/errors/NotFoundError.js'
import { ValidationError }            from '../../shared/errors/BadRequestError.js'
import { ErrorsMessages }             from '../../shared/messages/ErrorsMessagesFr.js'
import { generateReference }          from '../../shared/utils/generateReference.js'
import { ExchangeRateService }        from '../../shared/services/ExchangeRateService.js'

export class CreatePackageUseCase {
  constructor(
    private readonly packageRepo:   IPackageRepository,
    private readonly departureRepo: IDepartureRepository,
    private readonly natureRepo:    INatureRepository,
    private readonly jobScheduler:  IJobScheduler,
    private readonly paymentRepo?:  IPaymentRepository,
    private readonly personRepo?:   IPersonRepository,
  ) {}

  async execute(input: CreatePackageInput): Promise<PackageWithRelations> {
    const person = await this.personRepo?.findById(input.personId)
    if (!person) throw new NotFoundError(ErrorsMessages.PERSON_INTROUVABLE)
    if (input.recipientPhone === person.mobile) {
      throw new ValidationError("Le destinataire ne peut pas être l'expéditeur")
    }

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
        const price = nature.unitPrice === 0
          ? departure.price * n.quantity
          : nature.unitPrice * n.quantity
        return {
          natureId: n.natureId,
          quantity: n.quantity,
          price,
        }
      })
    )

    const lastReference = await this.packageRepo.getLastReference()
    const reference     = generateReference(lastReference)

    const props: CreatePackageProps = {
      ...input,
      reference,
      packageNatures: naturesWithPrice,
    }

    const pkg = await this.packageRepo.save(props)
    await this.jobScheduler.schedulePackageDeletion(pkg.id, new Date(pkg.departureGp.departureDate))

    if (input.payment && this.paymentRepo) {
      const currencyCode = pkg.departureGp.currency.code
      const exchangeRate = await ExchangeRateService.getRate(currencyCode)
      const amountXof    = ExchangeRateService.convertToXof(input.payment.amount, exchangeRate)
      await this.paymentRepo.save({
        ...input.payment,
        packageId:  pkg.id,
        creatorId:  input.creatorId,
        exchangeRate,
        amountXof,
      })
    }

    return pkg
  }
}
