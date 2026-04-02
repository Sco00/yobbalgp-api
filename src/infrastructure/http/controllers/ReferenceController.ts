import { type Request, type Response } from 'express'
import { container }                  from '../../config/container.js'
import { SuccessMessages }            from '../../../shared/messages/SuccessMessagesFr.js'
import { ResponseFormatter }          from '../middlewares/ReponseFormatter.js'

export class ReferenceController {
  getCurrencies = async (_req: Request, res: Response): Promise<void> => {
    const result = await container.listCurrenciesUseCase.execute()
    ResponseFormatter.success(res, result, SuccessMessages.DEVISES_RECUPEREES)
  }

  getPaymentMethods = async (_req: Request, res: Response): Promise<void> => {
    const result = await container.listPaymentMethodsUseCase.execute()
    ResponseFormatter.success(res, result, SuccessMessages.LISTE_RECUPEREE)
  }

  getRoles = async (_req: Request, res: Response): Promise<void> => {
    const result = await container.listRolesUseCase.execute()
    ResponseFormatter.success(res, result, SuccessMessages.LISTE_RECUPEREE)
  }

  getNatures = async (_req: Request, res: Response): Promise<void> => {
    const result = await container.listNaturesUseCase.execute()
    ResponseFormatter.success(res, result, SuccessMessages.NATURES_RECUPEREES)
  }
}
