import { IAccountRepository } from '../../domain/repositories/IAccountRepository.js'
import { AccountWithRelations, CreateAccountProps } from '../../domain/entities/Account/account.types.js'
import prisma from '../config/prisma.js'

const accountInclude = {
  role:   true,
  person: true,
} satisfies Parameters<typeof prisma.account.findUnique>[0]['include']

export class PrismaAccountRepository implements IAccountRepository {

  async save(props: CreateAccountProps): Promise<AccountWithRelations> {
    return await prisma.account.create({
      data:    props,
      include: accountInclude,
    })
  }

  async findById(id: string): Promise<AccountWithRelations | null> {
    return await prisma.account.findUnique({
      where:   { id },
      include: accountInclude,
    })
  }

  async findByEmail(email: string): Promise<AccountWithRelations | null> {
    return await prisma.account.findUnique({
      where:   { email },
      include: accountInclude,
    })
  }

  async update(id: string, props: Partial<CreateAccountProps>): Promise<AccountWithRelations> {
    return await prisma.account.update({
      where:   { id },
      data:    props,
      include: accountInclude,
    })
  }

  async delete(id: string): Promise<void> {
    await prisma.account.delete({ where: { id } })
  }
}