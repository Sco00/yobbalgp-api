import type { IAddressRepository, AddressFilters } from '../../../domain/repositories/IAddressRepository.js'
import type {
  AddressWithRelations,
  AddressDetailWithRelations,
  CreateAddressProps,
} from '../../../domain/entities/Address/address.types.js'

export class InMemoryAddressRepository implements IAddressRepository {
  private store: AddressWithRelations[] = []

  seed(address: AddressWithRelations): void {
    this.store.push(address)
  }

  reset(): void {
    this.store = []
  }

  async save(props: CreateAddressProps): Promise<AddressWithRelations> {
    const address = {
      id:          crypto.randomUUID(),
      country:     props.country,
      region:      props.region,
      city:        props.city,
      locality:    props.locality  ?? null,
      type:        props.type,
      latitude:    props.latitude  ?? null,
      longitude:   props.longitude ?? null,
      addressHash: props.addressHash,
      createdAt:   new Date(),
      relays:      [],
    } as unknown as AddressWithRelations
    this.store.push(address)
    return address
  }

  async findById(id: string): Promise<AddressWithRelations | null> {
    return this.store.find(a => a.id === id) ?? null
  }

  async findByHash(addressHash: string): Promise<AddressWithRelations | null> {
    return this.store.find(a => (a as any).addressHash === addressHash) ?? null
  }

  async findDetailById(id: string): Promise<AddressDetailWithRelations | null> {
    return this.store.find(a => a.id === id) as unknown as AddressDetailWithRelations | null
  }

  async findAll(_filters?: AddressFilters): Promise<{ props: AddressWithRelations[]; total: number }> {
    return { props: this.store, total: this.store.length }
  }

  async update(_id: string, _props: Partial<CreateAddressProps>): Promise<AddressWithRelations> {
    return this.store[0]! as AddressWithRelations
  }

  async delete(id: string): Promise<void> {
    this.store = this.store.filter(a => a.id !== id)
  }
}
