import { describe, it, expect, beforeEach }     from 'vitest'
import bcrypt                                    from 'bcryptjs'
import { LoginUseCase }                          from '../../account/LoginUseCase.js'
import { InMemoryAccountRepository }             from '../helpers/InMemoryAccountRepository.js'
import { ErrorsMessages }                        from '../../../shared/messages/ErrorsMessagesFr.js'
import type { AccountWithRelations }             from '../../../domain/entities/Account/account.types.js'

// ─── Helpers ─────────────────────────────────────────────────────────────────

function makeAccount(email: string, plainPassword: string): AccountWithRelations {
  const hash = bcrypt.hashSync(plainPassword, 10)
  return {
    id:        'acc-1',
    email,
    password:  hash,
    roleId:    'role-admin',
    personId:  'person-1',
    createdAt: new Date(),
    role:      { id: 'role-admin', name: 'ADMIN', createdAt: new Date() },
    person:    {
      id: 'person-1', firstName: 'Admin', lastName: 'Test',
      mobile: '+221771111111', personTypeId: 'pt-1', createdAt: new Date(),
    },
  } as unknown as AccountWithRelations
}

// ─── Tests ───────────────────────────────────────────────────────────────────

describe('LoginUseCase', () => {
  let accountRepo: InMemoryAccountRepository
  let useCase:     LoginUseCase

  beforeEach(() => {
    accountRepo = new InMemoryAccountRepository()
    useCase     = new LoginUseCase(accountRepo)
    accountRepo.seed(makeAccount('admin@yobbalgp.com', 'password123'))
  })

  it('retourne accessToken et refreshToken si credentials corrects', async () => {
    // ACT
    const result = await useCase.execute({
      email:    'admin@yobbalgp.com',
      password: 'password123',
    })

    // ASSERT
    expect(result.accessToken).toBeDefined()
    expect(result.refreshToken).toBeDefined()
    expect(result.user.email).toBe('admin@yobbalgp.com')
    expect(result.user.role).toBe('ADMIN')
    expect(result.user.person.firstName).toBe('Admin')
  })

  it('lève IDENTIFIANTS_INCORRECTS si email inexistant', async () => {
    await expect(
      useCase.execute({ email: 'inconnu@test.com', password: 'xxx' }),
    ).rejects.toThrow(ErrorsMessages.IDENTIFIANTS_INCORRECTS)
  })

  it('lève IDENTIFIANTS_INCORRECTS si mot de passe incorrect', async () => {
    await expect(
      useCase.execute({ email: 'admin@yobbalgp.com', password: 'mauvais' }),
    ).rejects.toThrow(ErrorsMessages.IDENTIFIANTS_INCORRECTS)
  })
})
