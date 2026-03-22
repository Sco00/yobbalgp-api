import { IPersonRepository, PersonFilters } from "../../domain/repositories/IPersonRepository.js";
import { Person } from "@prisma/client";
import prisma from "../config/prisma.js";
import { Prisma } from "@prisma/client";
import { CreatePersonProps, PersonWithRelations, PersonDetailWithRelations } from "../../domain/entities/Person/person.types.js";
import { type RepartitionClients, type TopClientItem } from "../../domain/entities/Dashboard/dashboard.types.js";

const personInclude = {
  personType: true,
  _count: { select: { packages: true } },
} satisfies Parameters<typeof prisma.person.findUnique>[0]["include"];

export class PrismaPersonRepository implements IPersonRepository {
  async save(props: CreatePersonProps): Promise<PersonWithRelations> {
    return await prisma.person.create({
      data: {
        firstName: props.firstName,
        lastName: props.lastName,
        mobile: props.mobile ?? null,
        personTypeId: props.personTypeId,
      },
      include: personInclude,
    });
  }

  async findById(id: string): Promise<PersonWithRelations | null> {
    return await prisma.person.findUnique({
      where: { id },
      include: personInclude,
    });
  }

  async findDetailById(id: string): Promise<PersonDetailWithRelations | null> {
    return await prisma.person.findUnique({
      where: { id },
      include: {
        personType: true,
        _count: { select: { packages: true } },
        account: { include: { role: true } },
        packages: {
          where: { isArchived: false },
          include: {
            statuses:  true,
            natures:   { include: { nature: true } },
            payments:  { include: { currency: true, paymentMethod: true } },
            departureGp: {
              include: {
                currency:           true,
                departureAddress:   true,
                destinationAddress: true,
              },
            },
          },
          orderBy: { createdAt: 'desc' },
        },
        relays: { include: { address: true } },
      },
    }) as PersonDetailWithRelations | null
  }

  async findByMobile(mobile: string): Promise<PersonWithRelations | null> {
    return await prisma.person.findFirst({ where: { mobile }, include: personInclude, });
  }

  async findAll(filters: PersonFilters): Promise<{ props: PersonWithRelations[]; total: number }> {
  const { personTypeId, search, hasPackages, page = 1, limit = 10 } = filters

  const where = {
      personTypeId: personTypeId!,
      ...(hasPackages && { packages: { some: {} } }),
      ...(search && {
        OR: [
          { firstName: { contains: search, mode: 'insensitive' as const } },
          { lastName:  { contains: search, mode: 'insensitive' as const } },
          { mobile:    { contains: search, mode: 'insensitive' as const } },
        ]
      })
    }

  const [props, total] = await prisma.$transaction([
    prisma.person.findMany({
      where,
      include: personInclude,
      orderBy: { createdAt: 'desc' },
      skip:    (page - 1) * limit,
      take:    limit,
    }),
    prisma.person.count({ where }),
  ])

  return { props, total }
}

  async update(id: string, props: Partial<Person>): Promise<void> {
    await prisma.person.update({
      where: { id },
      data: props,
    });
  }

  async delete(id: string): Promise<void> {
    await prisma.person.delete({ where: { id } });
  }

  // ── Dashboard ──────────────────────────────────────────────────────────────

  async getTotalClients(): Promise<number> {
    return prisma.person.count()
  }

  async getRepartitionClients(): Promise<RepartitionClients> {
    const rows = await prisma.$queryRaw<[{ nouveaux: bigint; recurrents: bigint }]>(Prisma.sql`
      SELECT
        COUNT(*) FILTER (WHERE nb_colis = 1)::int AS nouveaux,
        COUNT(*) FILTER (WHERE nb_colis > 1)::int AS recurrents
      FROM (
        SELECT person_id, COUNT(*) AS nb_colis
        FROM packages
        GROUP BY person_id
      ) sub
    `)
    const row = rows[0] ?? { nouveaux: BigInt(0), recurrents: BigInt(0) }
    return {
      nouveaux:   Number(row.nouveaux),
      recurrents: Number(row.recurrents),
    }
  }

  async getTopClients(): Promise<TopClientItem[]> {
    return prisma.$queryRaw<TopClientItem[]>(Prisma.sql`
      SELECT
        per.id,
        per.first_name AS "firstName",
        per.last_name  AS "lastName",
        COUNT(p.id)::int AS "nbColis",
        COALESCE(SUM(py.amount_xof) FILTER (WHERE py.accepted = true AND py.refunded = false), 0)::float AS "totalCa"
      FROM persons per
      JOIN packages p  ON p.person_id  = per.id
      LEFT JOIN payments py ON py.package_id = p.id
      GROUP BY per.id, per.first_name, per.last_name
      ORDER BY "nbColis" DESC
      LIMIT 5
    `)
  }
}
