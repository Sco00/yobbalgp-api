import type PDFDocument from 'pdfkit'
import { type QuoteData } from '../types/pdf.types.js'

const NAVY  = '#1F3864'
const WHITE = '#FFFFFF'
const BLACK = '#1A1A1A'
const GRAY  = '#F5F8FC'
const PAGE_W = 595.28
const MARGIN = 50
const CONTENT_W = PAGE_W - MARGIN * 2

function fmt(amount: number): string {
  return new Intl.NumberFormat('fr-FR').format(Math.round(amount)).replace(/[\u00a0\u202f]/g, ' ')
}

function fmtPrice(amount: number): string {
  return new Intl.NumberFormat('fr-FR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(amount)
}

function fmtDate(date: Date): string {
  return new Intl.DateTimeFormat('fr-FR').format(date)
}

export function buildQuoteContent(data: QuoteData, doc: InstanceType<typeof PDFDocument>): void {
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

  // ── Devis title ───────────────────────────────────────────────────────────
  let y = 110

  doc
    .rect(MARGIN, y, CONTENT_W, 28)
    .fill(NAVY)

  doc
    .fillColor(WHITE)
    .font('Helvetica-Bold')
    .fontSize(14)
    .text('DEVIS', MARGIN + 10, y + 7, { width: CONTENT_W / 2 })
    .font('Helvetica')
    .fontSize(9)
    .text(`Établi le : ${fmtDate(data.generatedAt)}`, MARGIN + CONTENT_W / 2, y + 10, {
      width: CONTENT_W / 2 - 10,
      align: 'right',
    })

  y += 40

  // ── Client / Colis ────────────────────────────────────────────────────────
  const colW = CONTENT_W / 2 - 5

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

  // ── Départ GP section ─────────────────────────────────────────────────────
  doc.rect(MARGIN, y, CONTENT_W, 22).fill(NAVY)
  doc.fillColor(WHITE).font('Helvetica-Bold').fontSize(9)
  doc.text('DÉPART GP', MARGIN + 8, y + 6)
  y += 22

  doc.rect(MARGIN, y, CONTENT_W, 40).fill(GRAY)
  doc
    .fillColor(BLACK)
    .font('Helvetica')
    .fontSize(9)
    .text(
      `Route  : ${data.departureGp.departureAddress}  →  ${data.departureGp.destinationAddress}`,
      MARGIN + 8, y + 6
    )
    .text(`Date   : ${fmtDate(data.departureGp.departureDate)}`, MARGIN + 8, y + 22)

  y += 50

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
    doc.text(n.name,                              MARGIN + 8,              y + 5, { width: 150 })
    doc.text(String(n.quantity),                   MARGIN + 160,             y + 5, { width: 40,  align: 'right' })
    doc.text(`${fmtPrice(n.unitPrice)} ${data.currency.code}`, MARGIN + 205, y + 5, { width: 100, align: 'right' })
    doc.text(`${fmtPrice(n.total)} ${data.currency.code}`,     MARGIN + CONTENT_W - 80, y + 5, { width: 70, align: 'right' })
    y += 20
  })

  y += 6
  doc.rect(MARGIN, y, CONTENT_W, 1).fill('#D0D9E8')
  y += 6

  // ── Total estimé ─────────────────────────────────────────────────────────
  doc.rect(MARGIN, y, CONTENT_W, 24).fill(NAVY)
  doc.fillColor(WHITE).font('Helvetica-Bold').fontSize(10)
  doc.text('TOTAL ESTIMÉ', MARGIN + CONTENT_W - 240, y + 6, { width: 150 })
  doc.text(
    `${fmtPrice(data.totalEstime)} EUR`,
    MARGIN + CONTENT_W - 80, y + 6,
    { width: 70, align: 'right' }
  )

  y += 28

  // ── Équivalences multi-devises ────────────────────────────────────────────
  const equivW = CONTENT_W / 3

  const devises = [
    { label: 'Équivalent XOF', value: `${fmt(data.totalXof)} FCFA` },
    { label: 'Équivalent USD', value: `${fmtPrice(data.totalUsd)} USD` },
    { label: 'Taux indicatif',  value: 'Taux du jour appliqué' },
  ]

  devises.forEach((d, i) => {
    const x = MARGIN + i * equivW
    doc.rect(x, y, equivW, 30).fill(i % 2 === 0 ? GRAY : WHITE)
    doc.fillColor(NAVY).font('Helvetica-Bold').fontSize(7.5)
       .text(d.label, x + 6, y + 5, { width: equivW - 8 })
    doc.fillColor(BLACK).font('Helvetica').fontSize(9)
       .text(d.value, x + 6, y + 16, { width: equivW - 8 })
  })

  y += 44

  // ── Disclaimer ────────────────────────────────────────────────────────────
  doc
    .fillColor('#888888')
    .font('Helvetica-Oblique')
    .fontSize(8)
    .text(
      `Document non contractuel — Devis établi le ${fmtDate(data.generatedAt)}`,
      MARGIN, y,
      { width: CONTENT_W, align: 'center' }
    )
}
