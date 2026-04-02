import { type Currency } from '../entities/Currency/currency.types.js'

export interface ICurrencyRepository {
  findAll(): Promise<Currency[]>
}
