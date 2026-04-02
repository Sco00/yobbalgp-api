import { type InvoiceData, type QuoteData } from '../types/PdfTypes.js'

export type { InvoiceData, QuoteData }

export interface IPdfRenderer {
  renderInvoice(data: InvoiceData): Promise<Buffer>
  renderQuote(data: QuoteData):     Promise<Buffer>
}
