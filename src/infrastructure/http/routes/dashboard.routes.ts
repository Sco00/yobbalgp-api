import { Router } from 'express'
import { DashboardController } from '../controllers/DashboardController.js'
import { AuthMiddleware } from '../middlewares/AuthMiddleware.js'
import { container } from '../../config/container.js'

const router = Router()
const controller = new DashboardController()

router.get('/', AuthMiddleware.authenticate,container.dashboardController.get,)

export { router as dashboardRoutes }
