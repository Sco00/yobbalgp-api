import { type IRoleRepository } from '../../domain/repositories/IRoleRepository.js'
import { type Role }            from '../../domain/entities/Role/role.types.js'
import prisma                   from '../config/prisma.js'

export class PrismaRoleRepository implements IRoleRepository {
  async findAll(): Promise<Role[]> {
    return prisma.role.findMany({ orderBy: { name: 'asc' } })
  }
}
