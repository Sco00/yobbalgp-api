import { type IPdfRenderer }             from './IPdfRenderer.js'
import { type InvoiceData, type QuoteData } from '../types/PdfTypes.js'

export class PdfService {
  constructor(private readonly renderer: IPdfRenderer) {}

  async generateInvoice(data: InvoiceData): Promise<Buffer> {
    return this.renderer.renderInvoice(data)
  }

  async generateQuote(data: QuoteData): Promise<Buffer> {
    return this.renderer.renderQuote(data)
  }
}
