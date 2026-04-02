import { type IRepository } from './IRepository.js'
import { type PaymentWithRelations, type PaymentListItem, type CreatePaymentProps } from '../entities/Payment/payment.types.js'
import { type CaMensuelItem } from '../entities/Dashboard/dashboard.types.js'

export interface PaymentFilters {
  accepted?:        boolean | undefined
  refunded?:        boolean | undefined
  currencyId?:      string  | undefined
  paymentMethodId?: string  | undefined
  createdAtFrom?:   Date    | undefined
  page?:            number  | undefined
  limit?:           number  | undefined
}

export interface IPaymentRepository
  extends Omit<IRepository<PaymentWithRelations, PaymentFilters>, 'save' | 'update' | 'delete' | 'findAll'> {
  save(props: CreatePaymentProps):                                          Promise<PaymentWithRelations>
  findAll(filters?: PaymentFilters): Promise<{ props: PaymentListItem[]; total: number }>
  findCurrencyCode(currencyId: string):         Promise<string>
  accept(id: string):                           Promise<void>
  refund(id: string):                           Promise<void>
  updateLinkInvoice(id: string, url: string):   Promise<void>

  // Dashboard
  getChiffreAffaires(): Promise<number>
  getCaMensuel():       Promise<CaMensuelItem[]>
}