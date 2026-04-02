import { type IPaymentRepository, type PaymentFilters } from '../../domain/repositories/IPaymentRepository.js'
import { type PaymentWithRelations, type PaymentListItem, paymentInclude, paymentListInclude, type CreatePaymentProps } from '../../domain/entities/Payment/payment.types.js'
import { type CaMensuelItem } from '../../domain/entities/Dashboard/dashboard.types.js'
import prisma from '../config/prisma.js'
import { Prisma } from '@prisma/client'


export class PrismaPaymentRepository implements IPaymentRepository {

  async save(props: CreatePaymentProps): Promise<PaymentWithRelations> {
    return await prisma.payment.create({
      data: {
        amount:          props.amount,
        currencyId:      props.currencyId,
        amountXof:       props.amountXof,
        exchangeRate:    props.exchangeRate,
        paymentMethodId: props.paymentMethodId,
        packageId:       props.packageId,
        creatorId:       props.creatorId,
        refunded:        false,
        linkInvoice:     props.linkInvoice     ?? null,
        remise:          props.remise          ?? 0,
        remiseReason:    props.remiseReason    ?? null,
        priceRelay:      props.priceRelay      ?? null,
        insurancePrice:  props.insurancePrice  ?? 0,
      },
      include: paymentInclude,
    })
  }

  async findCurrencyCode(currencyId: string): Promise<string> {
    const currency = await prisma.currency.findUniqueOrThrow({ where: { id: currencyId } })
    return currency.code
  }

  async findById(id: string): Promise<PaymentWithRelations | null> {
    return await prisma.payment.findUnique({
      where:   { id },
      include: paymentInclude,
    })
  }

  async findAll(filters: PaymentFilters = {}): Promise<{ props: PaymentListItem[]; total: number }> {
    const { accepted, refunded, currencyId, paymentMethodId, createdAtFrom, page = 1, limit = 10 } = filters

    const where = {
      ...(accepted         !== undefined && { accepted }),
      ...(refunded         !== undefined && { refunded }),
      ...(currencyId       !== undefined && { currencyId }),
      ...(paymentMethodId  !== undefined && { paymentMethodId }),
      ...(createdAtFrom    !== undefined && { createdAt: { gte: createdAtFrom } }),
    }

    const [data, total] = await prisma.$transaction([
      prisma.payment.findMany({
        where,
        include: paymentListInclude,
        orderBy: { createdAt: 'desc' },
        skip:    (page - 1) * limit,
        take:    limit,
      }),
      prisma.payment.count({ where }),
    ])

    return { props: data, total }
  }

  async accept(id: string): Promise<void> {
    await prisma.payment.update({
      where: { id },
      data:  { accepted: true },
    })
  }

  async refund(id: string): Promise<void> {
    await prisma.payment.update({
      where: { id },
      data:  { refunded: true },
    })
  }

  async updateLinkInvoice(id: string, url: string): Promise<void> {
    await prisma.payment.update({
      where: { id },
      data:  { linkInvoice: url },
    })
  }

  // ── Dashboard ──────────────────────────────────────────────────────────────

  async getChiffreAffaires(): Promise<number> {
    const result = await prisma.payment.aggregate({
      where: { accepted: true, refunded: false },
      _sum:  { amountXof: true },
    })
    return result._sum.amountXof ?? 0
  }

  async getCaMensuel(): Promise<CaMensuelItem[]> {
    return prisma.$queryRaw<CaMensuelItem[]>(Prisma.sql`
      SELECT
        TO_CHAR(DATE_TRUNC('month', created_at), 'Mon YYYY') AS mois,
        COALESCE(SUM(amount_xof), 0)::float                  AS ca
      FROM payments
      WHERE accepted   = true
        AND refunded   = false
        AND created_at >= NOW() - INTERVAL '12 months'
      GROUP BY DATE_TRUNC('month', created_at), mois
      ORDER BY DATE_TRUNC('month', created_at) ASC
    `)
  }
}