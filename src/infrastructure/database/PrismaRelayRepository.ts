import { type IRelayRepository, type RelayFilters } from '../../domain/repositories/IRelayRepository.js'
import { type RelayWithRelations, type CreateRelayProps } from '../../domain/entities/Relay/relay.types.js'
import { type Prisma } from '@prisma/client'
import prisma from '../config/prisma.js'

const relayInclude = {
  person:  true,
  address: true,
  _count: {
    select: { packages: true },
  },
} satisfies Parameters<typeof prisma.relay.findUnique>[0]['include']

const relayIncludeWithPackages = {
  person:   true,
  address:  true,
  packages: true,
  _count: {
    select: { packages: true },
  },
} satisfies Parameters<typeof prisma.relay.findUnique>[0]['include']

export class PrismaRelayRepository implements IRelayRepository {

  async save(props: CreateRelayProps): Promise<RelayWithRelations> {
    return await prisma.relay.create({
      data: {
        name:      props.name,
        personId:  props.personId,
        addressId: props.addressId,
      },
      include: relayInclude,
    })
  }

  async findById(id: string): Promise<RelayWithRelations | null> {
    return await prisma.relay.findUnique({
      where:   { id },
      include: relayIncludeWithPackages,
    }) as RelayWithRelations | null
  }

  async findByAddressId(addressId: string): Promise<RelayWithRelations | null> {
    return await prisma.relay.findFirst({
      where:   { addressId },
      include: relayInclude,
    })
  }

  async findAll(filters: RelayFilters = {}): Promise<{ props: RelayWithRelations[]; total: number }> {
    const { search, page = 1, limit = 20 } = filters

    const where: Prisma.RelayWhereInput = {
      ...(search && {
        name: { contains: search, mode: 'insensitive' }
      })
    }

    const [props, total] = await prisma.$transaction([
      prisma.relay.findMany({
        where,
        include: relayInclude,
        orderBy: { createdAt: 'desc' },
        skip:    (page - 1) * limit,
        take:    limit,
      }),
      prisma.relay.count({ where }),
    ])

    return { props, total }
  }

  async update(id: string, props: Partial<CreateRelayProps>): Promise<RelayWithRelations> {
    return await prisma.relay.update({
      where:   { id },
      data:    props,
      include: relayInclude,
    })
  }

  async delete(id: string): Promise<void> {
    await prisma.relay.delete({ where: { id } })
  }
}