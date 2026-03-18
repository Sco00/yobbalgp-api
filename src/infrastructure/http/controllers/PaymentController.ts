import { type Request, type Response } from 'express'
import { CreatePaymentSchema, PaymentFiltersSchema } from '../validators/payment.validator.js'
import { container } from '../../config/container.js'
import { SuccessMessages } from '../../../shared/messages/SuccessMessagesFr.js'
import { ResponseFormatter } from '../middlewares/ReponseFormatter.js'
import { HttpStatusCode } from '../../../shared/errors/StatusCode.js'

export class PaymentController {

  create = async (req: Request, res: Response): Promise<void> => {
    const dto    = CreatePaymentSchema.parse(req.body)
    const result = await container.createPaymentUseCase.execute({
      ...dto,
      creatorId:    req.user!.id
    })
    ResponseFormatter.success(res, result, SuccessMessages.PAIEMENT_CREE, HttpStatusCode.CREATED)
  }

  list = async (req: Request, res: Response): Promise<void> => {
    const filters = PaymentFiltersSchema.parse(req.query)
    const result  = await container.listPaymentsUseCase.execute(filters)
    ResponseFormatter.success(res, result, SuccessMessages.PAIEMENTS_RECUPERES)
  }

  getById = async (req: Request, res: Response): Promise<void> => {
    const result = await container.getPaymentByIdUseCase.execute(req.params.id as string)
    ResponseFormatter.success(res, result, SuccessMessages.PAIEMENT_RECUPERE);
  }

  accept = async (req: Request, res: Response): Promise<void> => {
    await container.acceptPaymentUseCase.execute(req.params.id as string)
    ResponseFormatter.success(res, null, SuccessMessages.PAIEMENT_ACCEPTE);
  }

  refund = async (req: Request, res: Response): Promise<void> => {
    await container.refundPaymentUseCase.execute(req.params.id as string)
    ResponseFormatter.success(res, null, SuccessMessages.PAIEMENT_REMBOURSE);
  }

  invoice = async (req: Request, res: Response): Promise<void> => {
    const url = await container.generateInvoiceUseCase.execute(req.params.id as string)
    res.json({ success: true, message: SuccessMessages.FACTURE_GENEREE, data: { invoiceUrl: url } })
  }
}