import type { IPaymentRepository, PaymentFilters } from '../../../domain/repositories/IPaymentRepository.js'
import type {
  PaymentWithRelations,
  PaymentListItem,
  CreatePaymentProps,
} from '../../../domain/entities/Payment/payment.types.js'
import type { CaMensuelItem } from '../../../domain/entities/Dashboard/dashboard.types.js'

export class InMemoryPaymentRepository implements IPaymentRepository {
  private store: PaymentWithRelations[] = []

  seed(payment: PaymentWithRelations): void {
    this.store.push(payment)
  }

  reset(): void {
    this.store = []
  }

  async save(props: CreatePaymentProps): Promise<PaymentWithRelations> {
    const payment = {
      id:              crypto.randomUUID(),
      amount:          props.amount,
      currencyId:      props.currencyId,
      amountXof:       props.amountXof,
      exchangeRate:    props.exchangeRate,
      paymentMethodId: props.paymentMethodId,
      packageId:       props.packageId,
      creatorId:       props.creatorId,
      linkInvoice:     props.linkInvoice  ?? null,
      remise:          props.remise       ?? null,
      remiseReason:    props.remiseReason ?? null,
      priceRelay:      props.priceRelay   ?? null,
      insurancePrice:  props.insurancePrice ?? null,
      accepted:        false,
      refunded:        false,
      createdAt:       new Date(),
      currency:        { id: props.currencyId, code: 'XOF' } as any,
      paymentMethod:   { id: props.paymentMethodId }          as any,
      package:         { id: props.packageId }                as any,
    } as unknown as PaymentWithRelations
    this.store.push(payment)
    return payment
  }

  async findById(id: string): Promise<PaymentWithRelations | null> {
    return this.store.find(p => p.id === id) ?? null
  }

  async findAll(_filters?: PaymentFilters): Promise<{ props: PaymentListItem[]; total: number }> {
    return { props: this.store as unknown as PaymentListItem[], total: this.store.length }
  }

  async findCurrencyCode(currencyId: string): Promise<string> {
    return currencyId === 'xof' ? 'XOF' : 'EUR'
  }

  async accept(id: string): Promise<void> {
    const payment = this.store.find(p => p.id === id)
    if (payment) (payment as any).accepted = true
  }

  async refund(id: string): Promise<void> {
    const payment = this.store.find(p => p.id === id)
    if (payment) (payment as any).refunded = true
  }

  async updateLinkInvoice(id: string, url: string): Promise<void> {
    const payment = this.store.find(p => p.id === id)
    if (payment) (payment as any).linkInvoice = url
  }

  async getChiffreAffaires(): Promise<number> { return 0 }
  async getCaMensuel(): Promise<CaMensuelItem[]> { return [] }
}
