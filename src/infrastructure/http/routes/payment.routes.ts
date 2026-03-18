import { Router } from 'express'
import { PaymentController } from '../controllers/PaymentController.js'
import { AuthMiddleware }    from '../middlewares/AuthMiddleware.js'

const router     = Router()
const controller = new PaymentController()

router.use(AuthMiddleware.authenticate)

router.get('/', AuthMiddleware.authorizeAdmin,  controller.list)
router.get('/:id', AuthMiddleware.authorizeAdmin,  controller.getById)
router.post('/', AuthMiddleware.authorizeAdmin,  controller.create)
router.patch('/:id/accept', AuthMiddleware.authorizeAdmin,  controller.accept)
router.patch('/:id/refund', AuthMiddleware.authorizeAdmin,  controller.refund)
router.get('/:id/invoice', AuthMiddleware.authorizeAdmin,  controller.invoice)

export { router as paymentRoutes }