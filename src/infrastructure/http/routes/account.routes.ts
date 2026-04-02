import { Router } from 'express'
import { AccountController } from '../controllers/AccountController.js'
import { AuthMiddleware }    from '../middlewares/AuthMiddleware.js'
import { container } from '../../config/container.js'

const router     = Router()

router.post('/', AuthMiddleware.authenticate, AuthMiddleware.authorizeAdmin, container.accountController.create)

export { router as accountRoutes }