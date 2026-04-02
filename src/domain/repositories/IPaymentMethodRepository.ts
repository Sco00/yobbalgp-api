import { type PaymentMethod } from '../entities/PaymentMethod/paymentMethod.types.js'

export interface IPaymentMethodRepository {
  findAll(): Promise<PaymentMethod[]>
}
