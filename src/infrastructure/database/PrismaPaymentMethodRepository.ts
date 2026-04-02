import { type IPaymentMethodRepository } from '../../domain/repositories/IPaymentMethodRepository.js'
import { type PaymentMethod }            from '../../domain/entities/PaymentMethod/paymentMethod.types.js'
import prisma                            from '../config/prisma.js'

export class PrismaPaymentMethodRepository implements IPaymentMethodRepository {
  async findAll(): Promise<PaymentMethod[]> {
    return prisma.paymentMethod.findMany({ orderBy: { name: 'asc' } })
  }
}
