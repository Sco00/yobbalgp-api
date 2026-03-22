import { Request, Response } from 'express'
import { CreatePersonSchema, PersonFiltersSchema } from '../validators/person.validator.js'
import { container } from '../../config/container.js'
import { SuccessMessages } from '../../../shared/messages/SuccessMessagesFr.js'
import { ResponseFormatter } from '../middlewares/ReponseFormatter.js'
import { HttpStatusCode } from '../../../shared/errors/StatusCode.js'
import prisma from '../../config/prisma.js'

export class PersonController {

  create = async (req: Request, res: Response): Promise<void> => {
    const dto    = CreatePersonSchema.parse(req.body);
    const result = await container.createPersonUseCase.execute(dto);
    ResponseFormatter.success(res, result, SuccessMessages.PERSONNE_CREEE, HttpStatusCode.CREATED);
  }

  list = async (req: Request, res: Response): Promise<void> => {
    const { personTypeId, search, hasPackages, page, limit } = PersonFiltersSchema.parse(req.query);
    const result = await container.listPersonsUseCase.execute({
      ...(personTypeId  && { personTypeId }),
      ...(search        && { search }),
      ...(hasPackages !== undefined && { hasPackages }),
      page,
      limit,
    });
    ResponseFormatter.success(res, result, SuccessMessages.PERSONNES_RECUPEREES);
  }

  getById = async (req: Request, res: Response): Promise<void> => {
    const result = await container.getPersonByIdUseCase.execute(req.params.id as string)
    ResponseFormatter.success(res, result, SuccessMessages.PERSONNE_RECUPEREE)
  }

  listTypes = async (_req: Request, res: Response): Promise<void> => {
    const types = await prisma.personType.findMany({
      where: { name: { not: 'simple' } },
      orderBy: { name: 'asc' },
    })
    ResponseFormatter.success(res, types, 'Types récupérés')
  }
}