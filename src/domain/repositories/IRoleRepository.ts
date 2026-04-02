import { type Role } from '../entities/Role/role.types.js'

export interface IRoleRepository {
  findAll(): Promise<Role[]>
}
