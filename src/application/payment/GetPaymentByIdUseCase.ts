import { IPaymentRepository } from "../../domain/repositories/IPaymentRepository.js";
import { type PaymentWithRelations } from "../../domain/entities/Payment/payment.types.js";
import { NotFoundError } from "../../shared/errors/NotFoundError.js";
import { ErrorsMessages } from "../../shared/messages/ErrorsMessagesFr.js";

export class GetPaymentByIdUseCase {
  constructor(private readonly paymentRepo: IPaymentRepository) {}

  async execute(id: string): Promise<PaymentWithRelations> {
    const pkg = await this.paymentRepo.findById(id);
    if (!pkg) throw new NotFoundError(ErrorsMessages.PAIEMENT_INTROUVABLE);
    return pkg;
  }
}
