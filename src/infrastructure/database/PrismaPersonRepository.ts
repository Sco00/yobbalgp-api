import { IPersonRepository, PersonFilters } from "../../domain/repositories/IPersonRepository.js";
import { Person } from "@prisma/client";
import prisma from "../config/prisma.js";
import { CreatePersonProps, PersonWithRelations } from "../../domain/entities/Person/person.types.js";

const personInclude = {
  personType: true,
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

  async findByMobile(mobile: string): Promise<PersonWithRelations | null> {
    return await prisma.person.findFirst({ where: { mobile }, include: personInclude, });
  }

  async findAll(filters: PersonFilters): Promise<{ props: PersonWithRelations[]; total: number }> {
  const { personTypeId, search, page = 1, limit = 10 } = filters

  const where = {
      personTypeId: personTypeId!,
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
}
