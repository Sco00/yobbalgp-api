import { Router }              from 'express'
import { AuthMiddleware }      from '../middlewares/AuthMiddleware.js'
import { ReferenceController } from '../controllers/ReferenceController.js'
import { container } from '../../config/container.js'

const router     = Router()

router.use(AuthMiddleware.authenticate)

router.get('/currencies',       AuthMiddleware.authorizeAdmin, container.referenceController.getCurrencies)
router.get('/payment-methods',  AuthMiddleware.authorizeAdmin, container.referenceController.getPaymentMethods)
router.get('/roles',            AuthMiddleware.authorizeAdmin, container.referenceController.getRoles)
router.get('/natures',          AuthMiddleware.authorizeAdmin, container.referenceController.getNatures)

export { router as referenceRoutes }
