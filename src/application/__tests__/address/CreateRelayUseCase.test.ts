import { describe, it, expect, beforeEach } from 'vitest'
import { CreateRelayUseCase }                from '../../relay/CreateRelayUseCase.js'
import { InMemoryRelayRepository }           from '../helpers/InMemoryRelayRepository.js'
import { ErrorsMessages }                    from '../../../shared/messages/ErrorsMessagesFr.js'
import type { CreateRelayInput }             from '../../dtos/relay.dtos.js'

// ─── Données de test ──────────────────────────────────────────────────────────

const baseInput: CreateRelayInput = {
  name:      'Relais Plateau',
  personId:  'person-1',
  addressId: 'addr-1',
}

// ─── Tests ────────────────────────────────────────────────────────────────────

describe('CreateRelayUseCase', () => {
  let relayRepo: InMemoryRelayRepository
  let useCase:   CreateRelayUseCase

  beforeEach(() => {
    relayRepo = new InMemoryRelayRepository()
    useCase   = new CreateRelayUseCase(relayRepo)
  })

  it('crée un relais avec une adresse disponible', async () => {
    // ACT
    const result = await useCase.execute(baseInput)

    // ASSERT
    expect(result).toBeDefined()
    expect(result.id).toBeDefined()
    expect(result.name).toBe('Relais Plateau')
    expect(result.addressId).toBe('addr-1')
  })

  it("lève RELAIS_DEJA_EXISTANT si l'adresse est déjà utilisée par un relais", async () => {
    // ARRANGE — créer un premier relais sur addr-1
    await useCase.execute(baseInput)

    // ACT + ASSERT — même addressId
    await expect(
      useCase.execute({ ...baseInput, name: 'Relais Bis' }),
    ).rejects.toThrow(ErrorsMessages.RELAIS_DEJA_EXISTANT)
  })
})
