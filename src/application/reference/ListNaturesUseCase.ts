import { type INatureRepository } from '../../domain/repositories/INatureRepository.js'
import { type Nature }            from '@prisma/client'

export class ListNaturesUseCase {
  constructor(private readonly natureRepo: INatureRepository) {}

  async execute(): Promise<Nature[]> {
    return this.natureRepo.findAll()
  }
}
