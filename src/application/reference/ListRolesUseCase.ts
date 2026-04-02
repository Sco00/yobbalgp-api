import { type IRoleRepository } from '../../domain/repositories/IRoleRepository.js'
import { type Role }            from '../../domain/entities/Role/role.types.js'

export class ListRolesUseCase {
  constructor(private readonly roleRepo: IRoleRepository) {}

  async execute(): Promise<Role[]> {
    return this.roleRepo.findAll()
  }
}
