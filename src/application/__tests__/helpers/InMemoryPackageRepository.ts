import type { IPackageRepository, PackageFilters } from '../../../domain/repositories/IPackageRepository.js'
import type {
  PackageWithRelations,
  PackageListItem,
  CreatePackageProps,
  NatureInput,
} from '../../../domain/entities/Package/package.types.js'
import type { PackageStates } from '../../../domain/enums/PackageStates.js'
import type {
  ColisParRouteItem,
  StatutsParMoisItem,
  DerniersColisItem,
} from '../../../domain/entities/Dashboard/dashboard.types.js'

export class InMemoryPackageRepository implements IPackageRepository {
  private store: PackageWithRelations[] = []

  /** Ids des colis archivés via archive() */
  public archivedIds = new Set<string>()

  /** Statuts mis à jour via updateStatus() : Map<packageId, PackageStates> */
  public statusMap = new Map<string, string>()

  /** Métadonnées de départ pour construire le retour de save() */
  private departureMeta = new Map<string, {
    departureDate: Date
    currencyCode:  string
    price:         number
  }>()

  /** Pré-charge un colis directement dans le store (données de test) */
  seed(pkg: PackageWithRelations): void {
    this.store.push(pkg)
  }

  /** Pré-charge les métadonnées d'un départ pour les utiliser dans save() */
  setDepartureMeta(
    departureId: string,
    meta: { departureDate: Date; currencyCode: string; price: number },
  ): void {
    this.departureMeta.set(departureId, meta)
  }

  reset(): void {
    this.store         = []
    this.archivedIds   = new Set()
    this.statusMap     = new Map()
    this.departureMeta = new Map()
  }

  async save(props: CreatePackageProps): Promise<PackageWithRelations> {
    const meta = this.departureMeta.get(props.departureGpId) ?? {
      departureDate: new Date(),
      currencyCode:  'XOF',
      price:         5000,
    }
    const pkg = {
      id:             crypto.randomUUID(),
      reference:      props.reference ?? null,
      weight:         props.weight,
      recipientName:  (props as any).recipientName  ?? '',
      recipientPhone: (props as any).recipientPhone ?? '',
      departureGpId:  props.departureGpId,
      personId:       props.personId,
      relayId:        props.relayId ?? null,
      creatorId:      props.creatorId,
      isCompleted:    false,
      isArchived:     false,
      createdAt:      new Date(),
      statuses:       [],
      natures:        props.packageNatures.map(n => ({
        packageId: '',
        natureId:  n.natureId,
        quantity:  n.quantity,
        price:     n.price,
        nature:    { id: n.natureId, name: 'Test', unitPrice: 0, createdAt: new Date() },
      })),
      payments:    [],
      creator:     { id: props.creatorId } as any,
      person:      { id: props.personId }  as any,
      relay:       null,
      departureGp: {
        id:                   props.departureGpId,
        departureDate:        meta.departureDate,
        price:                meta.price,
        isClosed:             false,
        currency:             { id: 'c1', code: meta.currencyCode },
        departureAddress:     {},
        destinationAddress:   {},
        person:               null,
      } as any,
    } as unknown as PackageWithRelations
    this.store.push(pkg)
    return pkg
  }

  async findById(id: string): Promise<PackageWithRelations | null> {
    return this.store.find(p => p.id === id) ?? null
  }

  async findAll(_filters?: PackageFilters): Promise<{ props: PackageListItem[]; total: number }> {
    return { props: this.store as unknown as PackageListItem[], total: this.store.length }
  }

  async updateStatus(packageId: string, state: PackageStates): Promise<void> {
    this.statusMap.set(packageId, state)
    const pkg = this.store.find(p => p.id === packageId)
    if (pkg) {
      const newStatus = {
        id:        crypto.randomUUID(),
        packageId,
        state:     state as string,
        createdAt: new Date(Date.now() + (pkg.statuses?.length ?? 0) * 1000 + 1),
      }
      ;(pkg.statuses as any[]).push(newStatus)
    }
  }

  async archive(packageId: string): Promise<void> {
    this.archivedIds.add(packageId)
  }

  async delete(id: string): Promise<void> {
    this.store = this.store.filter(p => p.id !== id)
  }

  async getLastReference(): Promise<string | null> {
    if (this.store.length === 0) return null
    const refs = this.store
      .map(p => p.reference)
      .filter((r): r is string => r !== null && r !== undefined)
    return refs.at(-1) ?? null
  }

  async addNature(_packageId: string, _nature: NatureInput): Promise<void>   { /* noop */ }
  async removeNature(_packageId: string, _natureId: string): Promise<void>   { /* noop */ }

  async getDashboardPackageStats(): Promise<{ totalColis: number; totalKg: number }> {
    return { totalColis: 0, totalKg: 0 }
  }
  async getColisParRoute(): Promise<ColisParRouteItem[]>   { return [] }
  async getStatutsParMois(): Promise<StatutsParMoisItem[]> { return [] }
  async getDerniersColis():  Promise<DerniersColisItem[]>  { return [] }
}
