import { INatureRepository } from '../../domain/repositories/INatureRepository.js' 
import { Nature } from '@prisma/client'
import prisma from '../config/prisma.js'

export class PrismaNatureRepository implements INatureRepository {
  async findById(id: string): Promise<Nature | null> {
    return await prisma.nature.findUnique({ where: { id } })
  }
}