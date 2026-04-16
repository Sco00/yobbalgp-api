import { Router }              from 'express'
import { AuthMiddleware }      from '../middlewares/AuthMiddleware.js'
import { container } from '../../config/container.js'

const router     = Router()

// router.use(AuthMiddleware.authorizeAdmin);
router.get('/currencies', container.referenceController.getCurrencies)
router.get('/payment-methods', container.referenceController.getPaymentMethods)
router.get('/roles', container.referenceController.getRoles)
router.get('/natures', container.referenceController.getNatures)

export { router as referenceRoutes }
