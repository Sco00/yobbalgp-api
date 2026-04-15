import { describe, it, expect, beforeEach } from 'vitest'
import { CreateAddressUseCase }              from '../../address/CreateAddressUseCase.js'
import { InMemoryAddressRepository }         from '../helpers/InMemoryAddressRepository.js'
import { ErrorsMessages }                    from '../../../shared/messages/ErrorsMessagesFr.js'
import { AddressType }                       from '../../../domain/enums/AddressType.js'
import type { CreateAddressInput }           from '../../dtos/address.dtos.js'

// ─── Données de test ──────────────────────────────────────────────────────────

const baseInput: CreateAddressInput = {
  country:  'Sénégal',
  region:   'Dakar',
  city:     'Dakar',
  locality: 'Plateau',
  type:     AddressType.SIMPLE,
}

// ─── Tests ────────────────────────────────────────────────────────────────────

describe('CreateAddressUseCase', () => {
  let addressRepo: InMemoryAddressRepository
  let useCase:     CreateAddressUseCase

  beforeEach(() => {
    addressRepo = new InMemoryAddressRepository()
    useCase     = new CreateAddressUseCase(addressRepo)
  })

  it('crée une adresse et calcule un hash unique', async () => {
    // ACT
    const result = await useCase.execute(baseInput)

    // ASSERT — adresse créée et hash présent
    expect(result).toBeDefined()
    expect(result.id).toBeDefined()
    // Le hash est : country-region-city-locality-type en UPPER_SNAKE
    const expectedHash = 'SÉNÉGAL-DAKAR-DAKAR-PLATEAU-SIMPLE'
    expect((result as any).addressHash).toBe(expectedHash)
  })

  it('lève ADRESSE_DEJA_EXISTANTE si le hash existe déjà', async () => {
    // ARRANGE — créer une première adresse
    await useCase.execute(baseInput)

    // ACT + ASSERT — même combinaison country/region/city/locality/type
    await expect(
      useCase.execute({ ...baseInput }),
    ).rejects.toThrow(ErrorsMessages.ADRESSE_DEJA_EXISTANTE)
  })
})
