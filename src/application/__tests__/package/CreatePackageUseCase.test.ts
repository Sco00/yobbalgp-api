import { describe, it, expect, beforeEach }    from 'vitest'
import { CreatePackageUseCase }                 from '../../package/CreatePackageUseCase.js'
import { InMemoryPackageRepository }            from '../helpers/InMemoryPackageRepository.js'
import { InMemoryDepartureRepository, makeDeparture } from '../helpers/InMemoryDepartureRepository.js'
import { InMemoryNatureRepository }             from '../helpers/InMemoryNatureRepository.js'
import { InMemoryJobScheduler }                 from '../helpers/InMemoryJobScheduler.js'
import { InMemoryPersonRepository }             from '../helpers/InMemoryPersonRepository.js'
import { ErrorsMessages }                       from '../../../shared/messages/ErrorsMessagesFr.js'
import { DepartureStates }                      from '../../../domain/enums/DepartureStates.js'
import type { CreatePackageInput }              from '../../dtos/package.dtos.js'
import type { PersonWithRelations }             from '../../../domain/entities/Person/person.types.js'

// ─── Helpers ──────────────────────────────────────────────────────────────────

const DEP_ID     = 'dep-1'
const PERSON_ID  = 'person-1'
const CREATOR_ID = 'creator-1'
const NATURE_ID  = 'nature-1'

function makePerson(mobile: string): PersonWithRelations {
  return {
    id: PERSON_ID, firstName: 'Amadou', lastName: 'Ba',
    mobile, personTypeId: 'pt-1', createdAt: new Date(),
    personType: {}, _count: { packages: 0 },
  } as unknown as PersonWithRelations
}

const baseInput: CreatePackageInput = {
  weight:          5,
  recipientName:   'Fatou Diallo',
  recipientPhone:  '+221780000001',
  departureGpId:   DEP_ID,
  personId:        PERSON_ID,
  creatorId:       CREATOR_ID,
  packageNatures:  [{ natureId: NATURE_ID, quantity: 2 }],
}

// ─── Tests ────────────────────────────────────────────────────────────────────

describe('CreatePackageUseCase', () => {
  let packageRepo:   InMemoryPackageRepository
  let departureRepo: InMemoryDepartureRepository
  let natureRepo:    InMemoryNatureRepository
  let personRepo:    InMemoryPersonRepository
  let jobScheduler:  InMemoryJobScheduler
  let useCase:       CreatePackageUseCase

  beforeEach(() => {
    packageRepo   = new InMemoryPackageRepository()
    departureRepo = new InMemoryDepartureRepository()
    natureRepo    = new InMemoryNatureRepository()
    personRepo    = new InMemoryPersonRepository()
    jobScheduler  = new InMemoryJobScheduler()

    useCase = new CreatePackageUseCase(
      packageRepo,
      departureRepo,
      natureRepo,
      jobScheduler,
      undefined,
      personRepo,
    )

    // Départ ouvert en EN_ATTENTE
    const dep = makeDeparture({ id: DEP_ID, isClosed: false, price: 5000 })
    dep.statuses = [{ id: 's1', departureGpId: DEP_ID, state: DepartureStates.EN_ATTENTE, createdAt: new Date() }] as any
    departureRepo.seed(dep)

    // Nature avec prix unitaire = 0 (price = departure.price * qty)
    natureRepo.seed({ id: NATURE_ID, name: 'Bagage', unitPrice: 0 })

    // Expéditeur
    personRepo.seed(makePerson('+221771234567'))

    // Mettre les métadonnées de départ dans le package repo pour le retour save()
    packageRepo.setDepartureMeta(DEP_ID, {
      departureDate: new Date(Date.now() + 7 * 86_400_000),
      currencyCode:  'XOF',
      price:         5000,
    })
  })

  it('crée un colis avec une référence au format PKG-XXX', async () => {
    // ACT
    const result = await useCase.execute(baseInput)

    // ASSERT
    expect(result.reference).toMatch(/^PKG-\d+$/)
  })

  it('lève DEPART_FERME si le départ est clôturé', async () => {
    // ARRANGE — départ fermé
    departureRepo.reset()
    const closedDep = makeDeparture({ id: DEP_ID, isClosed: true })
    closedDep.statuses = [{ id: 's1', departureGpId: DEP_ID, state: DepartureStates.EN_ATTENTE, createdAt: new Date() }] as any
    departureRepo.seed(closedDep)

    // ACT + ASSERT
    await expect(useCase.execute(baseInput)).rejects.toThrow(ErrorsMessages.DEPART_FERME)
  })

  it("lève NATURE_INTROUVABLE si une nature n'existe pas", async () => {
    // ACT + ASSERT — natureId inconnu
    await expect(
      useCase.execute({
        ...baseInput,
        packageNatures: [{ natureId: 'nature-inexistante', quantity: 1 }],
      }),
    ).rejects.toThrow(ErrorsMessages.NATURE_INTROUVABLE)
  })

  it("lève une erreur si recipientPhone est identique au mobile de l'expéditeur", async () => {
    // recipientPhone == mobile expéditeur
    await expect(
      useCase.execute({ ...baseInput, recipientPhone: '+221771234567' }),
    ).rejects.toThrow("Le destinataire ne peut pas être l'expéditeur")
  })
})
