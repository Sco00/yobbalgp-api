import { Router } from 'express'
import { AuthMiddleware }    from '../middlewares/AuthMiddleware.js'
import { container } from '../../config/container.js'

const router     = Router()

router.post('/', AuthMiddleware.authorizeAdmin, container.accountController.create)

export { router as accountRoutes }