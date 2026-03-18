import { type IPaymentRepository, type PaymentFilters } from '../../domain/repositories/IPaymentRepository.js'
import { type PaymentWithRelations, type CreatePaymentProps } from '../../domain/entities/Payment/payment.types.js'
import prisma from '../config/prisma.js'

const paymentInclude = {
  currency:      true,
  paymentMethod: true,
  package: {
    include: { person: true },
  },
} satisfies Parameters<typeof prisma.payment.findUnique>[0]['include']

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
        accepted:        false,
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

  async findById(id: string): Promise<PaymentWithRelations | null> {
    return await prisma.payment.findUnique({
      where:   { id },
      include: paymentInclude,
    })
  }

  async findAll(filters: PaymentFilters = {}): Promise<{ props: PaymentWithRelations[]; total: number }> {
    const { accepted, refunded, currencyId, page = 1, limit = 20 } = filters

    const where = {
      ...(accepted   !== undefined && { accepted }),
      ...(refunded   !== undefined && { refunded }),
      ...(currencyId !== undefined && { currencyId }),
    }

    const [data, total] = await prisma.$transaction([
      prisma.payment.findMany({
        where,
        include: paymentInclude,
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
}