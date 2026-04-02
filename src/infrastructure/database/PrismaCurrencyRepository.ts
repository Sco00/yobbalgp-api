import { type ICurrencyRepository } from '../../domain/repositories/ICurrencyRepository.js'
import { type Currency }            from '../../domain/entities/Currency/currency.types.js'
import prisma                       from '../config/prisma.js'

export class PrismaCurrencyRepository implements ICurrencyRepository {
  async findAll(): Promise<Currency[]> {
    return prisma.currency.findMany({ orderBy: { code: 'asc' } })
  }
}
