import { type IPaymentRepository } from '../../domain/repositories/IPaymentRepository.js'
import { Payment } from '../../domain/entities/Payment/Payment.js'
import { NotFoundError } from '../../shared/errors/NotFoundError.js'
import { ValidationError } from '../../shared/errors/BadRequestError.js'
import { ErrorsMessages } from '../../shared/messages/ErrorsMessagesFr.js'

export class RefundPaymentUseCase {
  constructor(private readonly paymentRepo: IPaymentRepository) {}

  async execute(id: string): Promise<void> {
    const row = await this.paymentRepo.findById(id)
    if (!row) throw new NotFoundError(ErrorsMessages.PAIEMENT_INTROUVABLE)

    const payment = new Payment(row)
    if (!payment.accepted) {
      throw new ValidationError(ErrorsMessages.PAIEMENT_NON_ACCEPTE)
    }
    if (!payment.canBeRefunded()) {
      throw new ValidationError(ErrorsMessages.PAIEMENT_DEJA_REMBOURSE)
    }

    await this.paymentRepo.refund(id)
  }
}