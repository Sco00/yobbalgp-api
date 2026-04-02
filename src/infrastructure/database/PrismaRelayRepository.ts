import { type IRelayRepository, type RelayFilters } from '../../domain/repositories/IRelayRepository.js'
import { type RelayWithRelations, type RelayDetailWithRelations, type CreateRelayProps } from '../../domain/entities/Relay/relay.types.js'
import { type Prisma } from '@prisma/client'
import prisma from '../config/prisma.js'

const relayInclude = {
  person:  true,
  address: true,
  _count: {
    select: { packages: true },
  },
} satisfies Parameters<typeof prisma.relay.findUnique>[0]['include']

const relayDetailInclude = {
  person:  { include: { personType: true } },
  address: true,
  _count: {
    select: { packages: true },
  },
  packages: {
    include: {
      statuses:    true,
      person:      true,
      natures:     { include: { nature: true } },
      payments:    { include: { currency: true, paymentMethod: true } },
      departureGp: { include: { departureAddress: true, destinationAddress: true } },
    },
    orderBy: { createdAt: 'desc' as const },
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
      include: relayInclude,
    })
  }

  async findDetailById(id: string): Promise<RelayDetailWithRelations | null> {
    return await prisma.relay.findUnique({
      where:   { id },
      include: relayDetailInclude,
    })
  }

  async findByAddressId(addressId: string): Promise<RelayWithRelations | null> {
    return await prisma.relay.findFirst({
      where:   { addressId },
      include: relayInclude,
    })
  }

  async findAll(filters: RelayFilters = {}): Promise<{ props: RelayWithRelations[]; total: number }> {
    const { search, country, region, city, page = 1, limit = 10 } = filters

    const where: Prisma.RelayWhereInput = {
      AND: [
        ...(search ? [{
          OR: [
            { person: { firstName: { contains: search, mode: 'insensitive' as const } } },
            { person: { lastName:  { contains: search, mode: 'insensitive' as const } } },
          ],
        }] : []),
        ...(country ? [{ address: { country: { contains: country, mode: 'insensitive' as const } } }] : []),
        ...(region  ? [{ address: { region:  { contains: region,  mode: 'insensitive' as const } } }] : []),
        ...(city    ? [{ address: { city:    { contains: city,    mode: 'insensitive' as const } } }] : []),
      ],
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