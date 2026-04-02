import { type ICurrencyRepository } from '../../domain/repositories/ICurrencyRepository.js'
import { type Currency }            from '../../domain/entities/Currency/currency.types.js'

export class ListCurrenciesUseCase {
  constructor(private readonly currencyRepo: ICurrencyRepository) {}

  async execute(): Promise<Currency[]> {
    return this.currencyRepo.findAll()
  }
}
