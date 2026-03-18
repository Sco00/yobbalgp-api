import { type IPackageRepository } from '../../domain/repositories/IPackageRepository.js'
import { PdfService }              from '../../shared/services/PdfService.js'
import { NotFoundError }           from '../../shared/errors/NotFoundError.js'
import { ErrorsMessages }          from '../../shared/messages/ErrorsMessagesFr.js'
import { type QuoteData }          from '../../infrastructure/pdf/types/pdf.types.js'

export class GenerateQuoteUseCase {

  constructor(private readonly packageRepo: IPackageRepository) {}

  async execute(packageId: string): Promise<Buffer> {
    const pkg = await this.packageRepo.findById(packageId)
    if (!pkg) throw new NotFoundError(ErrorsMessages.COLIS_INTROUVABLE)

    const { departureGp } = pkg

    const quoteData: QuoteData = {
      generatedAt: new Date(),
      client: {
        firstName: pkg.person.firstName,
        lastName:  pkg.person.lastName,
        mobile:    pkg.person.mobile,
      },
      package: {
        reference: pkg.reference,
        weight:    pkg.weight,
      },
      natures: pkg.natures.map(pn => ({
        name:      pn.nature.name,
        quantity:  pn.quantity,
        unitPrice: pn.price,
        total:     pn.quantity * pn.price,
      })),
      departureGp: {
        departureDate:      departureGp.departureDate,
        departureAddress:   `${departureGp.departureAddress.city}, ${departureGp.departureAddress.country}`,
        destinationAddress: `${departureGp.destinationAddress.city}, ${departureGp.destinationAddress.country}`,
      },
      totalEstime: pkg.natures.reduce((sum, pn) => sum + pn.quantity * pn.price, 0),
      currency: {
        code:   departureGp.currency.code,
        symbol: departureGp.currency.symbol,
      },
    }

    return PdfService.generateQuote(quoteData)
  }
}
