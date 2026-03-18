import { PdfRenderer }                      from '../../infrastructure/pdf/PdfRenderer.js'
import { type InvoiceData, type QuoteData } from '../../infrastructure/pdf/types/pdf.types.js'

export class PdfService {

  static async generateInvoice(data: InvoiceData): Promise<Buffer> {
    return PdfRenderer.renderInvoice(data)
  }

  static async generateQuote(data: QuoteData): Promise<Buffer> {
    return PdfRenderer.renderQuote(data)
  }
}
