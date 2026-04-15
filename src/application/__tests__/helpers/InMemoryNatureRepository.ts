import type { INatureRepository } from '../../../domain/repositories/INatureRepository.js'
import type { Nature }            from '@prisma/client'

export class InMemoryNatureRepository implements INatureRepository {
  private store: Partial<Nature>[] = []

  seed(nature: Pick<Nature, 'id' | 'name' | 'unitPrice'>): void {
    this.store.push(nature as Nature)
  }

  reset(): void {
    this.store = []
  }

  async findById(id: string): Promise<Nature | null> {
    return (this.store.find(n => n.id === id) as Nature) ?? null
  }

  async findAll(): Promise<Nature[]> {
    return this.store as Nature[]
  }
}
