import { type IPaymentRepository } from '../../domain/repositories/IPaymentRepository.js'
import { type IPackageRepository } from '../../domain/repositories/IPackageRepository.js'
import { type PaymentWithRelations } from '../../domain/entities/Payment/payment.types.js'
import { type CreatePaymentDTO } from '../../infrastructure/http/validators/payment.validator.js'
import { ExchangeRateService } from '../../shared/services/ExchangeRateService.js'
import { NotFoundError } from '../../shared/errors/NotFoundError.js'
import { ValidationError } from '../../shared/errors/BadRequestError.js'
import { ErrorsMessages } from '../../shared/messages/ErrorsMessagesFr.js'

interface CreatePaymentInput extends CreatePaymentDTO {
  creatorId: string
}

export class CreatePaymentUseCase {
  constructor(
    private readonly paymentRepo: IPaymentRepository,
    private readonly packageRepo: IPackageRepository,
  ) {}

  async execute(input: CreatePaymentInput): Promise<PaymentWithRelations> {
    const pkg = await this.packageRepo.findById(input.packageId)
    if (!pkg) throw new NotFoundError(ErrorsMessages.COLIS_INTROUVABLE)

    if (pkg.isArchived) throw new ValidationError(ErrorsMessages.COLIS_DEJA_ARCHIVE)

    const currencyCode = pkg.departureGp.currency.code  // ex: "EUR"

    const exchangeRate = await ExchangeRateService.getRate(currencyCode)

    const amountXof = ExchangeRateService.convertToXof(input.amount, exchangeRate)

    // 6. Persister
    return await this.paymentRepo.save({
      ...input,
      exchangeRate,
      amountXof
    })
  }
}