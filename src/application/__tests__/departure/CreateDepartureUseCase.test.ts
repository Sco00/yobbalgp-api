import { describe, it, expect, beforeEach } from 'vitest'
import { CreateDepartureUseCase }            from '../../departure/CreateDepartureUseCase.js'
import { InMemoryDepartureRepository }       from '../helpers/InMemoryDepartureRepository.js'
import { InMemoryJobScheduler }              from '../helpers/InMemoryJobScheduler.js'
import { ErrorsMessages }                    from '../../../shared/messages/ErrorsMessagesFr.js'
import type { CreateDepartureInput }         from '../../dtos/departure.dtos.js'

// ─── Helpers ──────────────────────────────────────────────────────────────────

const now = new Date()

/** Départ valide : deadline AVANT departureDate */
function validInput(): CreateDepartureInput {
  return {
    departureDate:        new Date(now.getTime() + 7 * 86_400_000),
    arrivalDate:          new Date(now.getTime() + 10 * 86_400_000),
    deadline:             new Date(now.getTime() + 3 * 86_400_000), // avant departureDate ✓
    price:                5000,
    priceGp:              3000,
    currencyId:           'xof',
    departureAddressId:   'addr-dep',
    destinationAddressId: 'addr-dest',
    creatorId:            'creator-1',
  }
}

// ─── Tests ────────────────────────────────────────────────────────────────────

describe('CreateDepartureUseCase', () => {
  let departureRepo: InMemoryDepartureRepository
  let jobScheduler:  InMemoryJobScheduler
  let useCase:       CreateDepartureUseCase

  beforeEach(() => {
    departureRepo = new InMemoryDepartureRepository()
    jobScheduler  = new InMemoryJobScheduler()
    useCase       = new CreateDepartureUseCase(departureRepo, jobScheduler)
  })

  it('lève DEPART_DEADLINE_INVALIDE si deadline >= departureDate', async () => {
    // ARRANGE — deadline APRÈS departureDate (invalide)
    const input: CreateDepartureInput = {
      ...validInput(),
      deadline: new Date(now.getTime() + 10 * 86_400_000), // == arrivalDate > departureDate
    }

    // ACT + ASSERT
    await expect(useCase.execute(input)).rejects.toThrow(ErrorsMessages.DEPART_DEADLINE_INVALIDE)
  })

  it('crée un départ et planifie les jobs BullMQ', async () => {
    // ACT
    const result = await useCase.execute(validInput())

    // ASSERT — départ créé
    expect(result).toBeDefined()
    expect(result.price).toBe(5000)

    // ASSERT — jobs planifiés
    expect(jobScheduler.scheduledDepartureJobs).toHaveLength(1)
    expect(jobScheduler.scheduledDepartureJobs[0]!.departureId).toBe(result.id)
  })
})
