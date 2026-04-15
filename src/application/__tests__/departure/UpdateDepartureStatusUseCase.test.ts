import { describe, it, expect, beforeEach }    from 'vitest'
import { UpdateDepartureStatusUseCase }         from '../../departure/UpdateDepartureStatusUseCase.js'
import { InMemoryDepartureRepository, makeDeparture, makeDepartureStatus } from '../helpers/InMemoryDepartureRepository.js'
import { InMemoryPackageRepository }            from '../helpers/InMemoryPackageRepository.js'
import { DepartureStates }                      from '../../../domain/enums/DepartureStates.js'
import { PackageStates }                        from '../../../domain/enums/PackageStates.js'
import { ErrorsMessages }                       from '../../../shared/messages/ErrorsMessagesFr.js'
import type { PackageWithRelations }            from '../../../domain/entities/Package/package.types.js'

// ─── Helpers ──────────────────────────────────────────────────────────────────

const DEP_ID = 'dep-1'

function makeMinimalPackage(id: string, state: PackageStates): { id: string; statuses: { state: string; createdAt: Date }[] } {
  return {
    id,
    statuses: [{ state: state as string, createdAt: new Date() }],
  }
}

// ─── Tests ────────────────────────────────────────────────────────────────────

describe('UpdateDepartureStatusUseCase', () => {
  let departureRepo: InMemoryDepartureRepository
  let packageRepo:   InMemoryPackageRepository
  let useCase:       UpdateDepartureStatusUseCase

  beforeEach(() => {
    departureRepo = new InMemoryDepartureRepository()
    packageRepo   = new InMemoryPackageRepository()
    useCase       = new UpdateDepartureStatusUseCase(departureRepo, packageRepo)
  })

  it('lève DEPART_TRANSITION_INVALIDE si transition non autorisée (EN_ATTENTE → ARRIVE)', async () => {
    // ARRANGE — départ EN_ATTENTE
    const dep = makeDeparture({ id: DEP_ID })
    dep.statuses = [makeDepartureStatus(DepartureStates.EN_ATTENTE)] as any
    departureRepo.seed(dep)

    // ACT + ASSERT — transition directe EN_ATTENTE → ARRIVE interdite
    await expect(
      useCase.execute(DEP_ID, DepartureStates.ARRIVE),
    ).rejects.toThrow(ErrorsMessages.DEPART_TRANSITION_INVALIDE)
  })

  it("propage l'état EN_TRANSIT à tous les colis du départ", async () => {
    // ARRANGE — départ EN_ATTENTE avec 2 colis
    const pkg1 = makeMinimalPackage('pkg-1', PackageStates.EN_ATTENTE)
    const pkg2 = makeMinimalPackage('pkg-2', PackageStates.EN_ATTENTE)

    const dep = makeDeparture({ id: DEP_ID })
    dep.statuses = [makeDepartureStatus(DepartureStates.EN_ATTENTE, 0)] as any
    ;(dep as any).packages = [pkg1, pkg2]
    departureRepo.seed(dep)

    // Pré-charger les packages dans le repo
    packageRepo.seed({ id: 'pkg-1', statuses: pkg1.statuses, departureGpId: DEP_ID } as unknown as PackageWithRelations)
    packageRepo.seed({ id: 'pkg-2', statuses: pkg2.statuses, departureGpId: DEP_ID } as unknown as PackageWithRelations)

    // ACT
    await useCase.execute(DEP_ID, DepartureStates.EN_TRANSIT)

    // ASSERT — les 2 colis sont passés en EN_TRANSIT
    expect(packageRepo.statusMap.get('pkg-1')).toBe(PackageStates.EN_TRANSIT)
    expect(packageRepo.statusMap.get('pkg-2')).toBe(PackageStates.EN_TRANSIT)
  })

  it("propage l'état ARRIVE à tous les colis du départ", async () => {
    // ARRANGE — départ EN_TRANSIT avec 2 colis EN_TRANSIT
    const pkg1 = makeMinimalPackage('pkg-1', PackageStates.EN_TRANSIT)
    const pkg2 = makeMinimalPackage('pkg-2', PackageStates.EN_TRANSIT)

    const dep = makeDeparture({ id: DEP_ID })
    dep.statuses = [makeDepartureStatus(DepartureStates.EN_TRANSIT, 0)] as any
    ;(dep as any).packages = [pkg1, pkg2]
    departureRepo.seed(dep)

    packageRepo.seed({ id: 'pkg-1', statuses: pkg1.statuses, departureGpId: DEP_ID } as unknown as PackageWithRelations)
    packageRepo.seed({ id: 'pkg-2', statuses: pkg2.statuses, departureGpId: DEP_ID } as unknown as PackageWithRelations)

    // ACT
    await useCase.execute(DEP_ID, DepartureStates.ARRIVE)

    // ASSERT — les 2 colis sont passés en ARRIVE
    expect(packageRepo.statusMap.get('pkg-1')).toBe(PackageStates.ARRIVE)
    expect(packageRepo.statusMap.get('pkg-2')).toBe(PackageStates.ARRIVE)
  })
})
