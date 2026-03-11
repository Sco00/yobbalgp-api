import { type Request, type Response } from 'express'
import { CreatePersonSchema } from '../validators/person.validator.js'
import { container } from '../../config/container.js'
import { SuccessMessages } from '../../../shared/messages/SuccessMessagesFr.js'

export class PersonController {

  create = async (req: Request, res: Response): Promise<void> => {
    const dto    = CreatePersonSchema.parse(req.body)
    const result = await container.createPersonUseCase.execute(dto)
    res.status(201).json({
      success: true,
      message: SuccessMessages.PERSONNE_CREEE,
      data:    { person: result },
    })
  }

  list = async (req: Request, res: Response): Promise<void> => {
    const result = await container.listPersonsUseCase.execute(req.query)
    res.json({
      success: true,
      message: SuccessMessages.PERSONNES_RECUPEREES,
      ...result,
    })
  }
}