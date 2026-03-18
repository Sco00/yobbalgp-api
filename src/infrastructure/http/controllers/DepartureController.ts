import { Request, Response, NextFunction } from 'express'
import { CreateDepartureSchema, DepartureFiltersSchema } from '../validators/departure.validator.js'
import { container } from '../../config/container.js'
import { ResponseFormatter } from '../middlewares/ReponseFormatter.js'
import { SuccessMessages } from '../../../shared/messages/SuccessMessagesFr.js'
import { HttpStatusCode } from '../../../shared/errors/StatusCode.js'

export class DepartureController {

  create = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const dto = CreateDepartureSchema.parse(req.body);
    const result = await container.createDepartureUseCase.execute({ ...dto, creatorId: req.user!.id });
    ResponseFormatter.success(res, result, SuccessMessages.DEPART_CREE, HttpStatusCode.CREATED);
  }

  async list(req: Request, res: Response, next: NextFunction): Promise<void> {
    const filters = DepartureFiltersSchema.parse(req.query);
    const result = await container.listDeparturesUseCase.execute(filters);
    ResponseFormatter.success(res, result, SuccessMessages.DEPARTS_RECUPERES);
  }

  async getById(req: Request, res: Response, next: NextFunction): Promise<void> {
    const result = await container.getDepartureByIdUseCase.execute(req.params.id as string);
    ResponseFormatter.success(res, result, SuccessMessages.DEPART_RECUPERE);
  }

  async close(req: Request, res: Response, next: NextFunction): Promise<void> {
    await container.closeDepartureUseCase.execute(req.params.id as string);
    ResponseFormatter.success(res, null, SuccessMessages.DEPART_FERME);
  }
}
