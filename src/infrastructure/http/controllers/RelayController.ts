import { type Request, type Response } from 'express'
import { CreateRelaySchema, RelayFiltersSchema } from '../validators/relay.validator.js'
import { container } from '../../config/container.js'
import { SuccessMessages } from '../../../shared/messages/SuccessMessagesFr.js'
import { ResponseFormatter } from '../middlewares/ReponseFormatter.js'
import { HttpStatusCode } from '../../../shared/errors/StatusCode.js'

export class RelayController {

  create = async (req: Request, res: Response): Promise<void> => {
    const dto    = CreateRelaySchema.parse(req.body)
    const result = await container.createRelayUseCase.execute(dto)
    ResponseFormatter.success(res, result, SuccessMessages.RELAIS_CREE, HttpStatusCode.CREATED);
  }

  list = async (req: Request, res: Response): Promise<void> => {
    const filters = RelayFiltersSchema.parse(req.query)
    const result  = await container.listRelaysUseCase.execute(filters)
    ResponseFormatter.success(res, result, SuccessMessages.RELAIS_RECUPERES);
  }

  getById = async (req: Request, res: Response): Promise<void> => {
    const result = await container.getRelayByIdUseCase.execute(req.params.id as string)
    ResponseFormatter.success(res, result, SuccessMessages.RELAIS_RECUPERE);
  }
}