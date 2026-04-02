import { type IPaymentRepository } from '../../domain/repositories/IPaymentRepository.js'
import { type PdfService }         from '../../shared/services/PdfService.js'
import { CloudinaryService }       from '../../shared/services/CloudinaryService.js'
import { ValidationError }         from '../../shared/errors/BadRequestError.js'
import { NotFoundError }           from '../../shared/errors/NotFoundError.js'
import { ErrorsMessages }          from '../../shared/messages/ErrorsMessagesFr.js'
import { type InvoiceData }        from '../../shared/types/PdfTypes.js'

export class GenerateInvoiceUseCase {

  constructor(
    private readonly paymentRepo: IPaymentRepository,
    private readonly pdfService:  PdfService,
  ) {}

  async execute(paymentId: string): Promise<string> {
    const payment = await this.paymentRepo.findById(paymentId)
    if (!payment) throw new NotFoundError(ErrorsMessages.PAIEMENT_INTROUVABLE)

    if (!payment.accepted) {
      throw new ValidationError(ErrorsMessages.PAIEMENT_NON_ACCEPTE)
    }

    const year          = new Date(payment.createdAt).getFullYear()
    const invoiceNumber = `FACT-${year}-${payment.id.slice(0, 8).toUpperCase()}`

    const invoiceData: InvoiceData = {
      invoiceNumber,
      createdAt:     payment.createdAt,
      client: {
        firstName: payment.package.person.firstName,
        lastName:  payment.package.person.lastName,
        mobile:    payment.package.person.mobile,
      },
      package: {
        reference: payment.package.reference,
        weight:    payment.package.weight,
      },
      natures: payment.package.natures.map(pn => ({
        name:      pn.nature.name,
        quantity:  pn.quantity,
        unitPrice: pn.price / pn.quantity,
        total:     pn.price,
      })),
      remise:         payment.remise,
      remiseReason:   payment.remiseReason,
      amount:         payment.amount,
      currency: {
        code:   payment.currency.code,
        symbol: payment.currency.symbol,
      },
      amountXof:      payment.amountXof,
      exchangeRate:   payment.exchangeRate,
      paymentMethod:  payment.paymentMethod.name,
      priceRelay:     payment.priceRelay,
      insurancePrice: payment.insurancePrice,
    }

    const buffer = await this.pdfService.generateInvoice(invoiceData)
    const url    = await CloudinaryService.uploadPdf(buffer, invoiceNumber)

    await this.paymentRepo.updateLinkInvoice(paymentId, url)

    return url
  }
}
