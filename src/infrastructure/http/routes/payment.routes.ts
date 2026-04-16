import { Router } from 'express'
import { AuthMiddleware }    from '../middlewares/AuthMiddleware.js'
import { container } from '../../config/container.js'

const router     = Router()

// router.use(AuthMiddleware.authorizeAdmin);
router.get('/', container.paymentController.list)
router.get('/:id', container.paymentController.getById)
router.post('/', container.paymentController.create)
router.patch('/:id/accept', container.paymentController.accept)
router.patch('/:id/refund', container.paymentController.refund)
router.get('/:id/invoice', container.paymentController.invoice)

export { router as paymentRoutes }