import { type IPaymentRepository, type PaymentFilters } from '../../domain/repositories/IPaymentRepository.js'
import { type PaymentListItem } from '../../domain/entities/Payment/payment.types.js'

interface ListPaymentsResult {
  props:  PaymentListItem[]
  total: number
  page:  number
  limit: number
}

export class ListPaymentsUseCase {
  constructor(private readonly paymentRepo: IPaymentRepository) {}

  async execute(filters: PaymentFilters): Promise<ListPaymentsResult> {
    const { props, total } = await this.paymentRepo.findAll(filters)
    return { props, total, page: filters.page ?? 1, limit: filters.limit ?? 20 }
  }
}