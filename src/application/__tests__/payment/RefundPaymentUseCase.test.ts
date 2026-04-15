import { describe, it, expect, beforeEach } from 'vitest'
import { RefundPaymentUseCase }              from '../../payment/RefundPaymentUseCase.js'
import { InMemoryPaymentRepository }         from '../helpers/InMemoryPaymentRepository.js'
import { ErrorsMessages }                    from '../../../shared/messages/ErrorsMessagesFr.js'
import type { PaymentWithRelations }         from '../../../domain/entities/Payment/payment.types.js'

// ─── Helpers ──────────────────────────────────────────────────────────────────

function makePayment(id: string, accepted: boolean, refunded: boolean): PaymentWithRelations {
  return {
    id,
    amount:          5000,
    currencyId:      'xof',
    amountXof:       5000,
    exchangeRate:    1,
    paymentMethodId: 'pm-1',
    packageId:       'pkg-1',
    creatorId:       'creator-1',
    linkInvoice:     null,
    remise:          null,
    remiseReason:    null,
    priceRelay:      null,
    insurancePrice:  null,
    accepted,
    refunded,
    createdAt:       new Date(),
    currency:        {} as any,
    paymentMethod:   {} as any,
    package:         {} as any,
  } as unknown as PaymentWithRelations
}

// ─── Tests ────────────────────────────────────────────────────────────────────

describe('RefundPaymentUseCase', () => {
  let paymentRepo: InMemoryPaymentRepository
  let useCase:     RefundPaymentUseCase

  beforeEach(() => {
    paymentRepo = new InMemoryPaymentRepository()
    useCase     = new RefundPaymentUseCase(paymentRepo)
  })

  it('rembourse un paiement accepté', async () => {
    // ARRANGE — paiement accepté, non remboursé
    paymentRepo.seed(makePayment('pay-1', true, false))

    // ACT
    await useCase.execute('pay-1')

    // ASSERT — refund() a été appelé
    const updated = await paymentRepo.findById('pay-1')
    expect((updated as any).refunded).toBe(true)
  })

  it("lève PAIEMENT_NON_ACCEPTE si le paiement n'est pas encore accepté", async () => {
    // ARRANGE — paiement non accepté
    paymentRepo.seed(makePayment('pay-2', false, false))

    // ACT + ASSERT
    await expect(useCase.execute('pay-2')).rejects.toThrow(ErrorsMessages.PAIEMENT_NON_ACCEPTE)
  })

  it('lève PAIEMENT_DEJA_REMBOURSE si le paiement est déjà remboursé', async () => {
    // ARRANGE — paiement déjà remboursé
    paymentRepo.seed(makePayment('pay-3', true, true))

    // ACT + ASSERT
    await expect(useCase.execute('pay-3')).rejects.toThrow(ErrorsMessages.PAIEMENT_DEJA_REMBOURSE)
  })
})
