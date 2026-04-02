import { type Request, type Response } from 'express'
import { container }          from '../../config/container.js'
import { ResponseFormatter }  from '../middlewares/ResponseFormatter.js'
import { SuccessMessages }    from '../../../shared/messages/SuccessMessagesFr.js'

export class DashboardController {
  async get(_req: Request, res: Response): Promise<void> {
    const data = await container.getDashboardUseCase.execute()
    ResponseFormatter.success(res, data, SuccessMessages.DASHBOARD_RECUPERE)
  }
}
