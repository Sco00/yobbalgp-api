import { type Request, type Response } from 'express'
import { CreateAddressSchema, AddressFiltersSchema } from '../validators/address.validator.js'
import { container }          from '../../config/container.js'
import { SuccessMessages }    from '../../../shared/messages/SuccessMessagesFr.js'
import { ResponseFormatter }  from '../middlewares/ReponseFormatter.js'
import { HttpStatusCode }     from '../../../shared/errors/StatusCode.js'

export class AddressController {

  create = async (req: Request, res: Response): Promise<void> => {
    const dto    = CreateAddressSchema.parse(req.body)
    const result = await container.createAddressUseCase.execute(dto)
    ResponseFormatter.success(res, result, SuccessMessages.ADRESSE_CREEE, HttpStatusCode.CREATED)
  }

  list = async (req: Request, res: Response): Promise<void> => {
    const filters = AddressFiltersSchema.parse(req.query)
    const result  = await container.listAddressesUseCase.execute(filters)
    ResponseFormatter.success(res, result, SuccessMessages.ADRESSES_RECUPEREES)
  }

  getById = async (req: Request, res: Response): Promise<void> => {
    const result = await container.getAddressByIdUseCase.execute(req.params.id as string)
    ResponseFormatter.success(res, result, SuccessMessages.ADRESSE_RECUPEREE)
  }
}
