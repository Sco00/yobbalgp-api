import { Router } from 'express'
import { AuthMiddleware } from '../middlewares/AuthMiddleware.js'
import { container } from '../../config/container.js'

const router = Router()

router.get('/', AuthMiddleware.authorizeAdmin, container.dashboardController.get,)

export { router as dashboardRoutes }
