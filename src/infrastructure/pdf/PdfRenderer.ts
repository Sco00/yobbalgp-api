import PDFDocument                       from 'pdfkit'
import { type InvoiceData, type QuoteData } from './types/pdf.types.js'
import { buildInvoiceContent }           from './templates/invoice.template.js'
import { buildQuoteContent }             from './templates/quote.template.js'
import { type IPdfRenderer }             from '../../shared/services/IPdfRenderer.js'

type DocBuilder = (doc: InstanceType<typeof PDFDocument>) => void

export class PdfRenderer implements IPdfRenderer {

  private render(builder: DocBuilder): Promise<Buffer> {
    return new Promise((resolve, reject) => {
      const doc    = new PDFDocument({ size: 'A4', margin: 50 })
      const chunks: Buffer[] = []

      doc.on('data',  chunk => chunks.push(chunk))
      doc.on('end',   ()    => resolve(Buffer.concat(chunks)))
      doc.on('error', err   => reject(err))

      builder(doc)
      doc.end()
    })
  }

  renderInvoice(data: InvoiceData): Promise<Buffer> {
    return this.render(doc => buildInvoiceContent(data, doc))
  }

  renderQuote(data: QuoteData): Promise<Buffer> {
    return this.render(doc => buildQuoteContent(data, doc))
  }
}
