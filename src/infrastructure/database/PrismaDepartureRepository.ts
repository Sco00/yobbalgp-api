import { type IDepartureRepository, type DepartureFilters } from '../../domain/repositories/IDepartureRepository.js'
import { type DepartureWithRelations, type CreateDepartureProps } from '../../domain/entities/DepartureGp/departure.types.js'
import { type Prisma } from '@prisma/client'
import prisma from '../config/prisma.js'

const departureInclude = {
  currency:           true,
  departureAddress:   true,
  destinationAddress: true,
  person:             true,
  creator:            true,
  packages:           true,
} satisfies Parameters<typeof prisma.departureGp.findUnique>[0]['include']

export class PrismaDepartureRepository implements IDepartureRepository {
  async save(props: CreateDepartureProps): Promise<DepartureWithRelations> {
    return await prisma.departureGp.create({
      data: {
        departureDate:        props.departureDate,
        deadline:             props.deadline,
        price:                props.price,
        priceGp:              props.priceGp,
        currencyId:           props.currencyId,
        departureAddressId:   props.departureAddressId,
        destinationAddressId: props.destinationAddressId,
        personId:             props.personId ?? null,
        creatorId:            props.creatorId,
        insurancePrice:       props.insurancePrice ?? null,
      },
      include: departureInclude,
    })
  }

  async findById(id: string): Promise<DepartureWithRelations | null> {
    return await prisma.departureGp.findUnique({ where: { id }, include: departureInclude })
  }

  async findAll(filters: DepartureFilters = { page: 1, limit: 20 }): Promise<{ props: DepartureWithRelations[]; total: number }> {
    const {
      departureCity,
      destinationCity,
      currencyId,
      isClosed,
      departureDateFrom,
      page,
      limit,
    } = filters

    const where: Prisma.DepartureGpWhereInput = {
      ...(currencyId  !== undefined && { currencyId }),
      ...(isClosed    !== undefined && { isClosed }),
      ...(departureCity   && { departureAddress:   { city: departureCity } }),
      ...(destinationCity && { destinationAddress: { city: destinationCity } }),
      ...((departureDateFrom) && {
        departureDate: {
          ...(departureDateFrom && { gte: departureDateFrom }),
        },
      }),
    }

    const [data, total] = await prisma.$transaction([
      prisma.departureGp.findMany({
        where,
        include: departureInclude,
        orderBy: { departureDate: 'desc' },
        skip:    (page - 1) * limit,
        take:    limit,
      }),
      prisma.departureGp.count({ where }),
    ])

    return { props: data as DepartureWithRelations[], total }
  }

  async update(id: string, props: Partial<DepartureWithRelations>): Promise<void> {
    await prisma.departureGp.update({ where: { id }, data: props as Prisma.DepartureGpUpdateInput })
  }

  async delete(id: string): Promise<void> {
    await prisma.departureGp.delete({ where: { id } })
  }

  async close(id: string): Promise<void> {
    await prisma.departureGp.update({ where: { id }, data: { isClosed: true } })
  }
}
