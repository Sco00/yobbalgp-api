import { type IPaymentMethodRepository } from '../../domain/repositories/IPaymentMethodRepository.js'
import { type PaymentMethod }            from '../../domain/entities/PaymentMethod/paymentMethod.types.js'

export class ListPaymentMethodsUseCase {
  constructor(private readonly paymentMethodRepo: IPaymentMethodRepository) {}

  async execute(): Promise<PaymentMethod[]> {
    return this.paymentMethodRepo.findAll()
  }
}
