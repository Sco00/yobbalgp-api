import { describe, it, expect, beforeEach }    from 'vitest'
import { UpdatePackageStatusUseCase }           from '../../package/UpdatePackageStatusUseCase.js'
import { InMemoryPackageRepository }            from '../helpers/InMemoryPackageRepository.js'
import { InMemoryDepartureRepository, makeDeparture, makeDepartureStatus } from '../helpers/InMemoryDepartureRepository.js'
import { PackageStates }                        from '../../../domain/enums/PackageStates.js'
import { DepartureStates }                      from '../../../domain/enums/DepartureStates.js'
import { ErrorsMessages }                       from '../../../shared/messages/ErrorsMessagesFr.js'
import type { PackageWithRelations }            from '../../../domain/entities/Package/package.types.js'

// ─── Helpers ──────────────────────────────────────────────────────────────────

const PKG_ID = 'pkg-1'
const DEP_ID = 'dep-1'

function makePackage(depId: string, statuses: { state: string; createdAt: Date }[]): PackageWithRelations {
  return {
    id:             PKG_ID,
    reference:      'PKG-001',
    weight:         5,
    departureGpId:  depId,
    personId:       'person-1',
    relayId:        null,
    creatorId:      'creator-1',
    isCompleted:    false,
    isArchived:     false,
    createdAt:      new Date(),
    statuses,
    natures:        [],
    payments:       [],
    creator:        {} as any,
    person:         {} as any,
    relay:          null,
    departureGp:    {} as any,
  } as unknown as PackageWithRelations
}

// ─── Tests ────────────────────────────────────────────────────────────────────

describe('UpdatePackageStatusUseCase', () => {
  let packageRepo:   InMemoryPackageRepository
  let departureRepo: InMemoryDepartureRepository
  let useCase:       UpdatePackageStatusUseCase

  beforeEach(() => {
    packageRepo   = new InMemoryPackageRepository()
    departureRepo = new InMemoryDepartureRepository()
    useCase       = new UpdatePackageStatusUseCase(packageRepo, departureRepo)
  })

  it("lève COLIS_MODIFICATION_IMPOSSIBLE si le départ n'est pas ARRIVE", async () => {
    // ARRANGE — départ en EN_TRANSIT
    const dep = makeDeparture({ id: DEP_ID })
    dep.statuses = [makeDepartureStatus(DepartureStates.EN_TRANSIT)] as any
    departureRepo.seed(dep)

    packageRepo.seed(makePackage(DEP_ID, [{
      state: PackageStates.EN_TRANSIT, createdAt: new Date(),
    }]))

    // ACT + ASSERT
    await expect(
      useCase.execute(PKG_ID, PackageStates.LIVRE),
    ).rejects.toThrow(ErrorsMessages.COLIS_MODIFICATION_IMPOSSIBLE)
  })

  it("lève COLIS_STATUT_INVALIDE si le nouveau statut n'est pas LIVRE ou RETOURNE", async () => {
    // ARRANGE — départ ARRIVE
    const dep = makeDeparture({ id: DEP_ID })
    dep.statuses = [makeDepartureStatus(DepartureStates.ARRIVE)] as any
    departureRepo.seed(dep)

    packageRepo.seed(makePackage(DEP_ID, [{
      state: PackageStates.ARRIVE, createdAt: new Date(),
    }]))

    // ACT + ASSERT — statut EN_TRANSIT invalide pour cette étape
    await expect(
      useCase.execute(PKG_ID, PackageStates.EN_TRANSIT),
    ).rejects.toThrow(ErrorsMessages.COLIS_STATUT_INVALIDE)
  })

  it('archive automatiquement le colis quand le statut passe à LIVRE', async () => {
    // ARRANGE — départ ARRIVE, colis ARRIVE
    const dep = makeDeparture({ id: DEP_ID })
    dep.statuses = [makeDepartureStatus(DepartureStates.ARRIVE)] as any
    departureRepo.seed(dep)

    packageRepo.seed(makePackage(DEP_ID, [{
      state: PackageStates.ARRIVE, createdAt: new Date(),
    }]))

    // ACT
    await useCase.execute(PKG_ID, PackageStates.LIVRE)

    // ASSERT — archive() a été appelée
    expect(packageRepo.archivedIds.has(PKG_ID)).toBe(true)
  })
})
