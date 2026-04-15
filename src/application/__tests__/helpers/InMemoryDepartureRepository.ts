import type { IDepartureRepository, DepartureFilters } from '../../../domain/repositories/IDepartureRepository.js'
import type {
  DepartureWithRelations,
  DepartureWithPackages,
  DepartureListItem,
  CreateDepartureProps,
} from '../../../domain/entities/DepartureGp/departure.types.js'
import { DepartureStates } from '../../../domain/enums/DepartureStates.js'

export class InMemoryDepartureRepository implements IDepartureRepository {
  private store: DepartureWithPackages[] = []

  /** Pré-charge un départ complet (avec statuses et packages pour les tests) */
  seed(departure: DepartureWithPackages): void {
    this.store.push(departure)
  }

  reset(): void {
    this.store = []
  }

  /** Récupère un départ par id (méthode synchrone utilitaire pour les tests) */
  getById(id: string): DepartureWithPackages | null {
    return this.store.find(d => d.id === id) ?? null
  }

  async save(props: CreateDepartureProps): Promise<DepartureWithRelations> {
    const dep: DepartureWithPackages = {
      id:                   crypto.randomUUID(),
      departureDate:        props.departureDate,
      arrivalDate:          props.arrivalDate,
      deadline:             props.deadline,
      price:                props.price,
      priceGp:              props.priceGp,
      currencyId:           props.currencyId,
      departureAddressId:   props.departureAddressId,
      destinationAddressId: props.destinationAddressId,
      personId:             props.personId ?? null,
      creatorId:            props.creatorId,
      insurancePrice:       props.insurancePrice ?? null,
      isClosed:             false,
      createdAt:            new Date(),
      statuses:             [],
      packages:             [],
      currency:             { id: props.currencyId, code: 'XOF', name: 'Franc CFA', symbol: 'F', createdAt: new Date() },
      departureAddress:     {} as any,
      destinationAddress:   {} as any,
      person:               null,
      creator:              {} as any,
    } as unknown as DepartureWithPackages
    this.store.push(dep)
    return dep as unknown as DepartureWithRelations
  }

  async findById(id: string): Promise<DepartureWithPackages | null> {
    return this.store.find(d => d.id === id) ?? null
  }

  async findAll(_filters?: DepartureFilters): Promise<{ props: DepartureListItem[]; total: number }> {
    return { props: [], total: 0 }
  }

  async updateState(id: string, state: DepartureStates): Promise<void> {
    const dep = this.store.find(d => d.id === id)
    if (!dep) return
    const newStatus = {
      id:            crypto.randomUUID(),
      departureGpId: id,
      state:         state as string,
      createdAt:     new Date(Date.now() + (dep.statuses?.length ?? 0) * 100 + 1),
    }
    ;(dep.statuses as any[]).push(newStatus)
  }

  async close(id: string): Promise<void> {
    const dep = this.store.find(d => d.id === id)
    if (dep) (dep as any).isClosed = true
  }

  async update(_id: string, _props: any): Promise<void> { /* noop */ }

  async delete(id: string): Promise<void> {
    this.store = this.store.filter(d => d.id !== id)
  }
}

/** Crée un départ minimal seedable avec un état initial */
export function makeDeparture(overrides: Partial<DepartureWithPackages> & { id: string }): DepartureWithPackages {
  const now = new Date()
  const base: DepartureWithPackages = {
    id:                   overrides.id,
    departureDate:        overrides.departureDate        ?? new Date(now.getTime() + 7 * 86_400_000),
    arrivalDate:          overrides.arrivalDate          ?? new Date(now.getTime() + 10 * 86_400_000),
    deadline:             overrides.deadline             ?? new Date(now.getTime() + 3 * 86_400_000),
    price:                overrides.price                ?? 5000,
    priceGp:              overrides.priceGp              ?? 3000,
    currencyId:           overrides.currencyId           ?? 'xof',
    departureAddressId:   overrides.departureAddressId   ?? 'dep-addr',
    destinationAddressId: overrides.destinationAddressId ?? 'dest-addr',
    personId:             overrides.personId             ?? null,
    creatorId:            overrides.creatorId            ?? 'creator-1',
    insurancePrice:       overrides.insurancePrice       ?? null,
    isClosed:             overrides.isClosed             ?? false,
    createdAt:            overrides.createdAt            ?? now,
    statuses:             overrides.statuses             ?? [],
    packages:             overrides.packages             ?? [],
    currency:             overrides.currency             ?? { id: 'xof', code: 'XOF' } as any,
    departureAddress:     overrides.departureAddress     ?? {} as any,
    destinationAddress:   overrides.destinationAddress   ?? {} as any,
    person:               overrides.person               ?? null,
    creator:              overrides.creator              ?? {} as any,
  } as unknown as DepartureWithPackages
  return base
}

/** Crée une entrée de statut de départ */
export function makeDepartureStatus(state: DepartureStates, offsetMs = 0) {
  return {
    id:            crypto.randomUUID(),
    departureGpId: '',
    state:         state as string,
    createdAt:     new Date(Date.now() + offsetMs),
  }
}
