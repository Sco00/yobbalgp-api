import { type IAddressRepository, type AddressFilters } from '../../domain/repositories/IAddressRepository.js'
import { type AddressWithRelations, type AddressDetailWithRelations, type CreateAddressProps, addressDetailInclude } from '../../domain/entities/Address/address.types.js'
import { type Prisma } from '@prisma/client'
import prisma          from '../config/prisma.js'

const addressInclude = {
  relays: true,
} as const satisfies Prisma.AddressInclude

export class PrismaAddressRepository implements IAddressRepository {

  async save(props: CreateAddressProps): Promise<AddressWithRelations> {
    return prisma.address.create({
      data: {
        country:     props.country,
        region:      props.region,
        city:        props.city,
        locality:    props.locality  ?? null,
        latitude:    props.latitude  ?? null,
        longitude:   props.longitude ?? null,
        type:        props.type,
        addressHash: props.addressHash,
      },
      include: addressInclude,
    })
  }

  async findById(id: string): Promise<AddressWithRelations | null> {
    return prisma.address.findUnique({
      where:   { id },
      include: addressInclude,
    })
  }

  async findByHash(addressHash: string): Promise<AddressWithRelations | null> {
    return prisma.address.findUnique({
      where:   { addressHash },
      include: addressInclude,
    })
  }

  async findAll(filters: AddressFilters = {}): Promise<{ props: AddressWithRelations[]; total: number }> {
    const { search, country, region, city, type, page = 1, limit = 10 } = filters

    const where: Prisma.AddressWhereInput = {
      AND: [
        ...(type    ? [{ type }]                                                                     : []),
        ...(country ? [{ country: { contains: country, mode: 'insensitive' as const } }]            : []),
        ...(region  ? [{ region:  { contains: region,  mode: 'insensitive' as const } }]            : []),
        ...(city    ? [{ city:    { contains: city,    mode: 'insensitive' as const } }]            : []),
        ...(search  ? [{
          OR: [
            { country:  { contains: search, mode: 'insensitive' as const } },
            { region:   { contains: search, mode: 'insensitive' as const } },
            { city:     { contains: search, mode: 'insensitive' as const } },
            { locality: { contains: search, mode: 'insensitive' as const } },
          ],
        }] : []),
      ],
    }

    const [props, total] = await prisma.$transaction([
      prisma.address.findMany({
        where,
        include: addressInclude,
        orderBy: [{ country: 'asc' }, { city: 'asc' }],
        skip:    (page - 1) * limit,
        take:    limit,
      }),
      prisma.address.count({ where }),
    ])

    return { props, total }
  }

  async update(id: string, props: Partial<CreateAddressProps>): Promise<AddressWithRelations> {
    return prisma.address.update({
      where: { id },
      data: {
        ...(props.country     !== undefined && { country:     props.country }),
        ...(props.region      !== undefined && { region:      props.region }),
        ...(props.city        !== undefined && { city:        props.city }),
        ...(props.type        !== undefined && { type:        props.type }),
        ...(props.addressHash !== undefined && { addressHash: props.addressHash }),
        ...(props.locality    !== undefined && { locality:    props.locality  ?? null }),
        ...(props.latitude    !== undefined && { latitude:    props.latitude  ?? null }),
        ...(props.longitude   !== undefined && { longitude:   props.longitude ?? null }),
      },
      include: addressInclude,
    })
  }

  async findDetailById(id: string): Promise<AddressDetailWithRelations | null> {
    return prisma.address.findUnique({
      where:   { id },
      include: addressDetailInclude,
    })
  }

  async delete(id: string): Promise<void> {
    await prisma.address.delete({ where: { id } })
  }
}
