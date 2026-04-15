import { describe, it, expect, beforeEach } from 'vitest'
import { CreatePersonUseCase }               from '../../person/CreatePersonUseCase.js'
import { InMemoryPersonRepository }          from '../helpers/InMemoryPersonRepository.js'
import { ErrorsMessages }                    from '../../../shared/messages/ErrorsMessagesFr.js'
import type { CreatePersonInput }            from '../../dtos/person.dtos.js'

// ─── Données de test ──────────────────────────────────────────────────────────

const baseInput: CreatePersonInput = {
  firstName:    'Ousmane',
  lastName:     'Diallo',
  mobile:       '+221771234567',
  personTypeId: 'pt-client',
}

// ─── Tests ───────────────────────────────────────────────────────────────────

describe('CreatePersonUseCase', () => {
  let personRepo: InMemoryPersonRepository
  let useCase:    CreatePersonUseCase

  beforeEach(() => {
    personRepo = new InMemoryPersonRepository()
    useCase    = new CreatePersonUseCase(personRepo)
  })

  it('crée une personne avec un mobile valide', async () => {
    // ACT
    const result = await useCase.execute(baseInput)

    // ASSERT
    expect(result.mobile).toBe('+221771234567')
    expect(result.firstName).toBe('Ousmane')
    expect(result.lastName).toBe('Diallo')
  })

  it('lève PERSON_DEJA_EXISTANTE si mobile déjà utilisé', async () => {
    // ARRANGE — insérer une première personne
    await useCase.execute(baseInput)

    // ACT + ASSERT — même mobile
    await expect(
      useCase.execute({ ...baseInput, firstName: 'Autre' }),
    ).rejects.toThrow(ErrorsMessages.PERSON_DEJA_EXISTANTE)
  })
})
