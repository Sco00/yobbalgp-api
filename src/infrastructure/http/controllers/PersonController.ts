import { Request, Response } from 'express'
import { CreatePersonSchema } from '../validators/person.validator.js'
import { container } from '../../config/container.js'
import { SuccessMessages } from '../../../shared/messages/SuccessMessagesFr.js'
import { ResponseFormatter } from '../middlewares/ReponseFormatter.js'
import { HttpStatusCode } from '../../../shared/errors/StatusCode.js'

export class PersonController {

  create = async (req: Request, res: Response): Promise<void> => {
    const dto    = CreatePersonSchema.parse(req.body);
    const result = await container.createPersonUseCase.execute(dto);
    ResponseFormatter.success(res, result, SuccessMessages.PERSONNE_CREEE, HttpStatusCode.CREATED);
  }

  list = async (req: Request, res: Response): Promise<void> => {
    const result = await container.listPersonsUseCase.execute(req.query);
    ResponseFormatter.success(res, result, SuccessMessages.PERSONNES_RECUPEREES);
  }

  getById = async (req: Request, res: Response): Promise<void> => {
    const result = await container.getPersonByIdUseCase.execute(req.params.id as string)
    ResponseFormatter.success(res, result, SuccessMessages.PERSONNE_RECUPEREE)
  }
}