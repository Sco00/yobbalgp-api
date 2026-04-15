import type { IRelayRepository, RelayFilters }  from '../../../domain/repositories/IRelayRepository.js'
import type {
  RelayWithRelations,
  RelayDetailWithRelations,
  CreateRelayProps,
} from '../../../domain/entities/Relay/relay.types.js'

export class InMemoryRelayRepository implements IRelayRepository {
  private store: RelayWithRelations[] = []

  seed(relay: RelayWithRelations): void {
    this.store.push(relay)
  }

  reset(): void {
    this.store = []
  }

  async save(props: CreateRelayProps): Promise<RelayWithRelations> {
    const relay = {
      id:        crypto.randomUUID(),
      name:      props.name,
      personId:  props.personId,
      addressId: props.addressId,
      createdAt: new Date(),
      person:    { id: props.personId }  as any,
      address:   { id: props.addressId } as any,
      _count:    { packages: 0 },
    } as unknown as RelayWithRelations
    this.store.push(relay)
    return relay
  }

  async findById(id: string): Promise<RelayWithRelations | null> {
    return this.store.find(r => r.id === id) ?? null
  }

  async findByAddressId(addressId: string): Promise<RelayWithRelations | null> {
    return this.store.find(r => r.addressId === addressId) ?? null
  }

  async findDetailById(id: string): Promise<RelayDetailWithRelations | null> {
    return this.store.find(r => r.id === id) as unknown as RelayDetailWithRelations | null
  }

  async findAll(_filters?: RelayFilters): Promise<{ props: RelayWithRelations[]; total: number }> {
    return { props: this.store, total: this.store.length }
  }

  async update(_id: string, _props: Partial<CreateRelayProps>): Promise<RelayWithRelations> {
    return this.store[0]! as RelayWithRelations
  }

  async delete(id: string): Promise<void> {
    this.store = this.store.filter(r => r.id !== id)
  }
}
