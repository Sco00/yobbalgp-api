import { ValidationError } from '../errors/BadRequestError.js'
import { ErrorsMessages } from '../messages/ErrorsMessagesFr.js'

export class ExchangeRateService {

  static async getRate(fromCurrency: string, toCurrency = 'XOF'): Promise<number> {
    if (fromCurrency === toCurrency) return 1

    const response = await fetch(
      `https://api.exchangerate-api.com/v4/latest/${fromCurrency}`
    )

    if (!response.ok) {
      throw new ValidationError(ErrorsMessages.TAUX_CHANGE_INDISPONIBLE)
    }

    const data = await response.json() as { rates: Record<string, number> }

    const rate = data.rates[toCurrency]
    if (!rate) throw new ValidationError(ErrorsMessages.TAUX_CHANGE_INDISPONIBLE)

    return rate
  }

    static convertToXof(amount: number, rate: number): number {
    return Math.round(amount * rate)
    }
}