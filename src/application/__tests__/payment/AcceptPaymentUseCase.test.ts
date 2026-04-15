import { describe, it, expect, beforeEach } from 'vitest'
import { AcceptPaymentUseCase }              from '../../payment/AcceptPaymentUseCase.js'
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

describe('AcceptPaymentUseCase', () => {
  let paymentRepo: InMemoryPaymentRepository
  let useCase:     AcceptPaymentUseCase

  beforeEach(() => {
    paymentRepo = new InMemoryPaymentRepository()
    useCase     = new AcceptPaymentUseCase(paymentRepo)
  })

  it('accepte un paiement non encore accepté', async () => {
    // ARRANGE
    paymentRepo.seed(makePayment('pay-1', false, false))

    // ACT
    await useCase.execute('pay-1')

    // ASSERT — accept() a été appelé (le champ accepted est passé à true)
    const updated = await paymentRepo.findById('pay-1')
    expect((updated as any).accepted).toBe(true)
  })

  it('lève PAIEMENT_DEJA_ACCEPTE si le paiement est déjà accepté', async () => {
    // ARRANGE
    paymentRepo.seed(makePayment('pay-2', true, false))

    // ACT + ASSERT
    await expect(useCase.execute('pay-2')).rejects.toThrow(ErrorsMessages.PAIEMENT_DEJA_ACCEPTE)
  })
})
