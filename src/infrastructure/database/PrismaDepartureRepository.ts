import { type IDepartureRepository, type DepartureFilters } from '../../domain/repositories/IDepartureRepository.js'
import { type DepartureWithRelations, type CreateDepartureProps, type DepartureWithPackages } from '../../domain/entities/DepartureGp/departure.types.js'
import { type DepartureStates } from '../../domain/enums/DepartureStates.js'
import { type Prisma } from '@prisma/client'
import prisma from '../config/prisma.js'

const departureInclude = {
  currency:           true,
  departureAddress:   true,
  destinationAddress: true,
  person:             true,
  creator:            true,
  statuses:           true,
} as const

const departureWithPackagesInclude = {
  currency:           true,
  departureAddress:   true,
  destinationAddress: true,
  person:             true,
  creator:            true,
  statuses:           true,
  packages: {
    where:   { isArchived: false },
    include: { statuses: true },
  },
} as const

export class PrismaDepartureRepository implements IDepartureRepository {
  async save(props: CreateDepartureProps): Promise<DepartureWithRelations> {
    return await prisma.departureGp.create({
      data: {
        departureDate:        props.departureDate,
        arrivalDate:          props.arrivalDate,
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

  async findWithPackages(id: string): Promise<DepartureWithPackages | null> {
    return await prisma.departureGp.findUnique({
      where:   { id },
      include: departureWithPackagesInclude,
    }) as DepartureWithPackages | null
  }

  async findAll(filters: DepartureFilters = { page: 1, limit: 10 }): Promise<{ props: DepartureWithRelations[]; total: number }> {
    const {
      departureCountry,
      destinationCountry,
      currencyId,
      isClosed,
      departureDateFrom,
      search,
      page,
      limit,
    } = filters

    const where: Prisma.DepartureGpWhereInput = {
      ...(currencyId         !== undefined && { currencyId }),
      ...(isClosed           !== undefined && { isClosed }),
      ...(departureCountry   && { departureAddress:   { country: { contains: departureCountry,   mode: 'insensitive' } } }),
      ...(destinationCountry && { destinationAddress: { country: { contains: destinationCountry, mode: 'insensitive' } } }),
      ...(departureDateFrom && { departureDate: { gte: departureDateFrom } }),
      ...(search && {
        OR: [
          {
            person: {
              OR: [
                { firstName: { contains: search, mode: 'insensitive' } },
                { lastName:  { contains: search, mode: 'insensitive' } },
              ],
            },
          },
          { departureAddress:   { country:  { contains: search, mode: 'insensitive' } } },
          { departureAddress:   { region:   { contains: search, mode: 'insensitive' } } },
          { departureAddress:   { city:     { contains: search, mode: 'insensitive' } } },
          { departureAddress:   { locality: { contains: search, mode: 'insensitive' } } },
          { destinationAddress: { country:  { contains: search, mode: 'insensitive' } } },
          { destinationAddress: { region:   { contains: search, mode: 'insensitive' } } },
          { destinationAddress: { city:     { contains: search, mode: 'insensitive' } } },
          { destinationAddress: { locality: { contains: search, mode: 'insensitive' } } },
        ],
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

  async updateState(id: string, state: DepartureStates): Promise<void> {
    await prisma.departureStatus.create({
      data: { departureGpId: id, state }
    })
  }
}
