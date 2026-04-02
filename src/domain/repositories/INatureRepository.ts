import {  Nature } from '@prisma/client'

export interface INatureRepository {
  findById(id: string): Promise<Nature | null>
  findAll(): Promise<Nature[]>
}