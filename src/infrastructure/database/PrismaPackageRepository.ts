import { type IPackageRepository, type PackageFilters } from '../../domain/repositories/IPackageRepository.js'
import { PackageWithRelations, CreatePackageProps } from '../../domain/entities/Package/package.types.js'
import { type PackageStates } from '../../domain/enums/PackageStates.js'
import prisma from '../config/prisma.js'

const packageInclude = {
  person:      true,
  creator:     true,
  relay:       true,
  departureGp: true,
  natures:     { include: { nature: true } },
  statuses:    { orderBy: { createdAt: 'desc' as const } },
} satisfies Parameters<typeof prisma.package.findUnique>[0]['include']

export class PrismaPackageRepository implements IPackageRepository {
    async save(props: CreatePackageProps): Promise<PackageWithRelations> {
    return await prisma.package.create({
      data: {
        reference:     props.reference!,
        weight:        props.weight,
        creatorId:     props.creatorId,
        personId:      props.personId,
        relayId:       props.relayId ?? null,
        departureGpId: props.departureGpId,
        natures: {
          create: props.packageNatures.map(n => ({
            natureId: n.natureId,
            quantity: n.quantity,
            price:    n.price,
          }))
        },
        statuses: {
          create: {}
        }
      },
      include: packageInclude,
    })
  }

  async findById(id: string): Promise<PackageWithRelations | null> {
    return await prisma.package.findUnique({
      where:   { id },
      include: packageInclude,
    })
  }

    async findAll(filters: PackageFilters = {page  : 1, limit : 20}): Promise<{ props: PackageWithRelations[]; total: number }> {
        const {
            state,
            departureDateFrom,
            departureCountry,
            destinationCountry,
            currencyId,
            page,
            limit,
        } = filters

        const departureGpFilter = {
            ...(currencyId         && { currencyId }),
            ...(departureDateFrom  && { departureDate: { gte: departureDateFrom } }),
            ...(departureCountry   && { departureAddress:    { country: departureCountry } }),
            ...(destinationCountry && { destinationAddress:  { country: destinationCountry } }),
        }

        const where = {
            ...(state && { statuses: { some: { state } } }),
            ...(Object.keys(departureGpFilter).length > 0 && { departureGp: departureGpFilter }),
        }

        const [data, total] = await prisma.$transaction([
            prisma.package.findMany({
            where,
            include: packageInclude,
            orderBy: { createdAt: 'desc' },
            skip:    (page - 1) * limit,
            take:    limit,
            }),
            prisma.package.count({ where }),
        ])

        return { props: data as PackageWithRelations[], total }
    }

    async updateStatus(packageId: string, state: PackageStates): Promise<void> {
    await prisma.packageStatus.create({
      data: { packageId, state }
    })
  }

  async archive(packageId: string): Promise<void> {
    await prisma.package.update({
      where: { id: packageId },
      data:  { isArchived: true }
    })
  }

  async delete(packageId: string): Promise<void> {
    await prisma.package.delete({
      where: { id: packageId }
    })
  }

  async getLastReference(): Promise<string | null> {
  const last = await prisma.package.findFirst({
    orderBy: { createdAt: 'desc' },
    select:  { reference: true },
  })
  return last?.reference ?? null
}
}