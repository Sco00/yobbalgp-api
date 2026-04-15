import { type IPackageRepository, type PackageFilters } from '../../domain/repositories/IPackageRepository.js'
import { PackageWithRelations, PackageListItem, packageInclude, packageListInclude, CreatePackageProps, NatureInput } from '../../domain/entities/Package/package.types.js'
import { type PackageStates } from '../../domain/enums/PackageStates.js'
import { type ColisParRouteItem, type StatutsParMoisItem, type DerniersColisItem } from '../../domain/entities/Dashboard/dashboard.types.js'
import prisma from '../config/prisma.js'
import { Prisma } from '@prisma/client'


export class PrismaPackageRepository implements IPackageRepository {
  async save(props: CreatePackageProps): Promise<PackageWithRelations> {
    return await prisma.package.create({
      data: {
        reference:      props.reference!,
        weight:         props.weight,
        recipientName:  props.recipientName,
        recipientPhone: props.recipientPhone,
        creatorId:      props.creatorId,
        personId:       props.personId,
        relayId:        props.relayId ?? null,
        departureGpId:  props.departureGpId,
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

    async findAll(filters: PackageFilters = {page: 1, limit: 10}): Promise<{ props: PackageListItem[]; total: number }> {
        const {
            search,
            state,
            createdAtFrom,
            departureCountry,
            destinationCountry,
            currencyId,
            unpaidOnly,
            page,
            limit,
        } = filters

        const departureGpFilter = {
            ...(currencyId         && { currencyId }),
            ...(departureCountry   && { departureAddress:    { country: departureCountry } }),
            ...(destinationCountry && { destinationAddress:  { country: destinationCountry } }),
        }

        const where = {
            ...(search && {
                OR: [
                    { reference: { contains: search, mode: 'insensitive' as const } },
                    { person:    { OR: [
                        { firstName: { contains: search, mode: 'insensitive' as const } },
                        { lastName:  { contains: search, mode: 'insensitive' as const } },
                    ]}},
                ],
            }),
            ...(state        && { currentState: state }),
            ...(createdAtFrom && { createdAt: { gte: createdAtFrom } }),
            ...(Object.keys(departureGpFilter).length > 0 && { departureGp: departureGpFilter }),
            ...(unpaidOnly   && { payments: { none: { accepted: true, refunded: false } } }),
        }

        const [data, total] = await prisma.$transaction([
            prisma.package.findMany({
            where,
            include: packageListInclude,
            orderBy: { createdAt: 'desc' },
            skip:    (page - 1) * limit,
            take:    limit,
            }),
            prisma.package.count({ where }),
        ])

        return { props: data, total }
    }

    async updateStatus(packageId: string, state: PackageStates): Promise<void> {
    await prisma.$transaction([
      prisma.packageStatus.create({ data: { packageId, state } }),
      prisma.package.update({ where: { id: packageId }, data: { currentState: state } }),
    ])
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

  async addNature(packageId: string, nature: NatureInput): Promise<void> {
    await prisma.packageNature.create({
      data: {
          packageId,
          natureId: nature.natureId,
          quantity: nature.quantity,
          price:    nature.price,
      }
    })
  }

  async removeNature(packageId: string, natureId: string): Promise<void> {
    await prisma.packageNature.deleteMany({
      where: { packageId, natureId }
    })
  }

  // ── Dashboard ──────────────────────────────────────────────────────────────

  async getDashboardPackageStats(): Promise<{ totalColis: number; totalKg: number }> {
    const result = await prisma.package.aggregate({
      _count: { id: true },
      _sum:   { weight: true },
    })
    return {
      totalColis: result._count.id,
      totalKg:    result._sum.weight ?? 0,
    }
  }

  async getColisParRoute(): Promise<ColisParRouteItem[]> {
    return prisma.$queryRaw<ColisParRouteItem[]>(Prisma.sql`
      SELECT
        dep_addr.city    AS "departureCity",
        dep_addr.country AS "departureCountry",
        dest_addr.city   AS "destinationCity",
        dest_addr.country AS "destinationCountry",
        COUNT(p.id)::int AS "nbColis",
        COALESCE(SUM(py.amount_xof) FILTER (WHERE py.accepted = true AND py.refunded = false), 0)::float AS ca
      FROM packages p
      JOIN departure_gps d      ON p.departure_gp_id      = d.id
      JOIN addresses dep_addr   ON d.departure_address_id = dep_addr.id
      JOIN addresses dest_addr  ON d.destination_address_id = dest_addr.id
      LEFT JOIN payments py     ON py.package_id = p.id
      GROUP BY dep_addr.city, dep_addr.country, dest_addr.city, dest_addr.country
      ORDER BY "nbColis" DESC
      LIMIT 10
    `)
  }

  async getStatutsParMois(): Promise<StatutsParMoisItem[]> {
    return prisma.$queryRaw<StatutsParMoisItem[]>(Prisma.sql`
      SELECT
        TO_CHAR(DATE_TRUNC('month', p.created_at), 'Mon YYYY') AS mois,
        COALESCE(SUM(CASE WHEN ls.state = 'EN_ATTENTE' THEN 1 ELSE 0 END), 0)::int AS "EN_ATTENTE",
        COALESCE(SUM(CASE WHEN ls.state = 'EN_TRANSIT' THEN 1 ELSE 0 END), 0)::int AS "EN_TRANSIT",
        COALESCE(SUM(CASE WHEN ls.state = 'ARRIVE'     THEN 1 ELSE 0 END), 0)::int AS "ARRIVE",
        COALESCE(SUM(CASE WHEN ls.state = 'LIVRE'      THEN 1 ELSE 0 END), 0)::int AS "LIVRE",
        COALESCE(SUM(CASE WHEN ls.state = 'RETOURNE'   THEN 1 ELSE 0 END), 0)::int AS "RETOURNE"
      FROM packages p
      LEFT JOIN LATERAL (
        SELECT state FROM package_statuses
        WHERE package_id = p.id
        ORDER BY created_at DESC
        LIMIT 1
      ) ls ON true
      WHERE p.created_at >= NOW() - INTERVAL '6 months'
      GROUP BY DATE_TRUNC('month', p.created_at), mois
      ORDER BY DATE_TRUNC('month', p.created_at) ASC
    `)
  }

  async getDerniersColis(): Promise<DerniersColisItem[]> {
    return prisma.$queryRaw<DerniersColisItem[]>(Prisma.sql`
      SELECT
        p.id,
        p.reference,
        p.weight,
        p.created_at   AS "createdAt",
        per.first_name AS "firstName",
        per.last_name  AS "lastName",
        dep_addr.city  AS "departureCity",
        dest_addr.city AS "destinationCity",
        COALESCE(ls.state, 'EN_ATTENTE') AS "currentState",
        py.amount_xof  AS "amount"
      FROM packages p
      JOIN persons per           ON p.person_id             = per.id
      JOIN departure_gps d       ON p.departure_gp_id       = d.id
      JOIN addresses dep_addr    ON d.departure_address_id  = dep_addr.id
      JOIN addresses dest_addr   ON d.destination_address_id = dest_addr.id
      LEFT JOIN LATERAL (
        SELECT state FROM package_statuses
        WHERE package_id = p.id
        ORDER BY created_at DESC
        LIMIT 1
      ) ls ON true
      LEFT JOIN LATERAL (
        SELECT amount_xof FROM payments
        WHERE package_id = p.id
        ORDER BY created_at DESC
        LIMIT 1
      ) py ON true
      ORDER BY p.created_at DESC
      LIMIT 5
    `)
  }
}