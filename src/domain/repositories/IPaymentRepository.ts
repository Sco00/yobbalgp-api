import { type IRepository } from './IRepository.js'
import { type PaymentWithRelations, type CreatePaymentProps } from '../entities/Payment/payment.types.js'

export interface PaymentFilters {
  accepted?:        boolean | undefined
  refunded?:        boolean | undefined
  currencyId?:      string  | undefined
  page?:            number  | undefined
  limit?:           number  | undefined
}

export interface IPaymentRepository
  extends Omit<IRepository<PaymentWithRelations, PaymentFilters>, 'save' | 'update' | 'delete'> {
  save(props: CreatePaymentProps):              Promise<PaymentWithRelations>
  accept(id: string):                           Promise<void>
  refund(id: string):                           Promise<void>
  updateLinkInvoice(id: string, url: string):   Promise<void>
}