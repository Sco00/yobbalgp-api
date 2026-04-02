import { Router } from 'express'
import { PaymentController } from '../controllers/PaymentController.js'
import { AuthMiddleware }    from '../middlewares/AuthMiddleware.js'
import { container } from '../../config/container.js'

const router     = Router()

router.use(AuthMiddleware.authenticate)

router.get('/', AuthMiddleware.authorizeAdmin,  container.paymentController.list)
router.get('/:id', AuthMiddleware.authorizeAdmin,  container.paymentController.getById)
router.post('/', AuthMiddleware.authorizeAdmin,  container.paymentController.create)
router.patch('/:id/accept', AuthMiddleware.authorizeAdmin,  container.paymentController.accept)
router.patch('/:id/refund', AuthMiddleware.authorizeAdmin,  container.paymentController.refund)
router.get('/:id/invoice', AuthMiddleware.authorizeAdmin,  container.paymentController.invoice)

export { router as paymentRoutes }