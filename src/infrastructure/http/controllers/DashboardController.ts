import { type Request, type Response } from 'express'
import { container } from '../../config/container.js'

export class DashboardController {
  async get(_req: Request, res: Response): Promise<void> {
    const data = await container.getDashboardUseCase.execute()
    res.json({ success: true, message: 'Dashboard récupéré', data })
  }
}
