import type PDFDocument from 'pdfkit'
import { type InvoiceData } from '../types/pdf.types.js'

const NAVY  = '#1F3864'
const WHITE = '#FFFFFF'
const BLACK = '#1A1A1A'
const GRAY  = '#F5F8FC'
const GREEN = '#27AE60'
const PAGE_W = 595.28
const MARGIN = 50
const CONTENT_W = PAGE_W - MARGIN * 2

function fmt(amount: number): string {
  return new Intl.NumberFormat('fr-FR').format(Math.round(amount))
}

function fmtDate(date: Date): string {
  return new Intl.DateTimeFormat('fr-FR').format(date)
}

export function buildInvoiceContent(data: InvoiceData, doc: InstanceType<typeof PDFDocument>): void {
  // ── Header ────────────────────────────────────────────────────────────────
  doc
    .rect(0, 0, PAGE_W, 90)
    .fill(NAVY)

  doc
    .fillColor(WHITE)
    .font('Helvetica-Bold')
    .fontSize(22)
    .text('FATHALA IT', MARGIN, 22)

  doc
    .font('Helvetica')
    .fontSize(9)
    .text('yobbalgp@fathala.com', MARGIN, 50)
    .text('Dakar, Sénégal', MARGIN, 62)

  doc
    .font('Helvetica-Bold')
    .fontSize(10)
    .text('YOBBALGP', PAGE_W - MARGIN - 100, 40, { width: 100, align: 'right' })

  // ── Invoice title ─────────────────────────────────────────────────────────
  let y = 110

  doc
    .rect(MARGIN, y, CONTENT_W, 28)
    .fill(NAVY)

  doc
    .fillColor(WHITE)
    .font('Helvetica-Bold')
    .fontSize(11)
    .text(`FACTURE N° ${data.invoiceNumber}`, MARGIN + 10, y + 8, { width: CONTENT_W / 2 })
    .text(`Date : ${fmtDate(data.createdAt)}`, MARGIN + CONTENT_W / 2, y + 8, {
      width: CONTENT_W / 2 - 10,
      align: 'right',
    })

  y += 40

  // ── Client / Colis ────────────────────────────────────────────────────────
  const colW = CONTENT_W / 2 - 5

  // Client box
  doc.rect(MARGIN, y, colW, 65).strokeColor('#D0D9E8').lineWidth(1).stroke()
  doc
    .fillColor(NAVY)
    .font('Helvetica-Bold')
    .fontSize(9)
    .text('CLIENT', MARGIN + 8, y + 8)
  doc
    .fillColor(BLACK)
    .font('Helvetica-Bold')
    .fontSize(10)
    .text(`${data.client.firstName} ${data.client.lastName}`, MARGIN + 8, y + 22)
  doc
    .font('Helvetica')
    .fontSize(9)
    .text(data.client.mobile, MARGIN + 8, y + 36)

  // Colis box
  const colX = MARGIN + colW + 10
  doc.rect(colX, y, colW, 65).strokeColor('#D0D9E8').lineWidth(1).stroke()
  doc
    .fillColor(NAVY)
    .font('Helvetica-Bold')
    .fontSize(9)
    .text('COLIS', colX + 8, y + 8)
  doc
    .fillColor(BLACK)
    .font('Helvetica')
    .fontSize(9)
    .text(`Référence : ${data.package.reference}`, colX + 8, y + 22)
    .text(`Poids     : ${data.package.weight} kg`, colX + 8, y + 36)

  y += 80

  // ── Natures table header ──────────────────────────────────────────────────
  doc.rect(MARGIN, y, CONTENT_W, 22).fill(NAVY)
  doc.fillColor(WHITE).font('Helvetica-Bold').fontSize(9)
  doc.text('Nature',          MARGIN + 8,              y + 6, { width: 150 })
  doc.text('Qté',             MARGIN + 160,             y + 6, { width: 40,  align: 'right' })
  doc.text('Prix unitaire',   MARGIN + 205,             y + 6, { width: 100, align: 'right' })
  doc.text('Total',           MARGIN + CONTENT_W - 80, y + 6, { width: 70,  align: 'right' })

  y += 22

  // ── Natures rows ──────────────────────────────────────────────────────────
  data.natures.forEach((n, i) => {
    const bg = i % 2 === 0 ? WHITE : GRAY
    doc.rect(MARGIN, y, CONTENT_W, 20).fill(bg)
    doc.fillColor(BLACK).font('Helvetica').fontSize(9)
    doc.text(n.name,                    MARGIN + 8,              y + 5, { width: 150 })
    doc.text(String(n.quantity),         MARGIN + 160,             y + 5, { width: 40,  align: 'right' })
    doc.text(`${fmt(n.unitPrice)} XOF`,  MARGIN + 205,             y + 5, { width: 100, align: 'right' })
    doc.text(`${fmt(n.total)} XOF`,      MARGIN + CONTENT_W - 80, y + 5, { width: 70,  align: 'right' })
    y += 20
  })

  y += 6

  // ── Totals ────────────────────────────────────────────────────────────────
  const subtotal = data.natures.reduce((s, n) => s + n.total, 0)
  const labelX = MARGIN + CONTENT_W - 240
  const valX   = MARGIN + CONTENT_W - 80
  const valW   = 70

  function totalRow(label: string, value: string, bold = false, bg?: string): void {
    if (bg) doc.rect(MARGIN, y, CONTENT_W, 20).fill(bg)
    const color = bg === NAVY ? WHITE : BLACK
    doc.fillColor(color).font(bold ? 'Helvetica-Bold' : 'Helvetica').fontSize(9)
    doc.text(label, labelX, y + 5, { width: 150 })
    doc.text(value, valX, y + 5, { width: valW, align: 'right' })
    y += 20
  }

  doc.rect(MARGIN, y, CONTENT_W, 1).fill('#D0D9E8')
  y += 4

  totalRow('Sous-total',              `${fmt(subtotal)} XOF`)
  if (data.remise > 0) {
    const label = data.remiseReason ? `Remise (${data.remiseReason})` : 'Remise'
    totalRow(label, `-${fmt(data.remise)} XOF`)
  }
  if (data.priceRelay != null && data.priceRelay > 0) {
    totalRow('Prix relais', `${fmt(data.priceRelay)} XOF`)
  }
  if (data.insurancePrice > 0) {
    totalRow('Assurance', `${fmt(data.insurancePrice)} XOF`)
  }

  y += 2
  doc.rect(MARGIN, y, CONTENT_W, 24).fill(NAVY)
  doc.fillColor(WHITE).font('Helvetica-Bold').fontSize(10)
  doc.text('TOTAL', labelX, y + 6, { width: 150 })
  doc.text(`${fmt(data.amountXof)} XOF`, valX, y + 6, { width: valW, align: 'right' })
  y += 24

  // ── Exchange + payment method ─────────────────────────────────────────────
  y += 10
  doc.rect(MARGIN, y, CONTENT_W, 40).fill(GRAY)
  doc
    .fillColor(BLACK)
    .font('Helvetica')
    .fontSize(9)
    .text(
      `Soit ${fmt(data.amount)} ${data.currency.symbol} (taux : ${data.exchangeRate})`,
      MARGIN + 10, y + 6
    )
    .text(`Moyen de paiement : ${data.paymentMethod}`, MARGIN + 10, y + 20)

  y += 55

  // ── PAYÉ stamp ────────────────────────────────────────────────────────────
  doc
    .roundedRect(PAGE_W / 2 - 60, y, 120, 36, 6)
    .lineWidth(3)
    .strokeColor(GREEN)
    .stroke()

  doc
    .fillColor(GREEN)
    .font('Helvetica-Bold')
    .fontSize(20)
    .text('✓  PAYÉ', PAGE_W / 2 - 55, y + 8, { width: 110, align: 'center' })
}
