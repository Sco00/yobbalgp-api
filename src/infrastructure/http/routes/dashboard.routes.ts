import { Router } from 'express'
import { DashboardController } from '../controllers/DashboardController.js'
import { AuthMiddleware } from '../middlewares/AuthMiddleware.js'

const router = Router()
const controller = new DashboardController()

router.get(
  '/',
  AuthMiddleware.authenticate,
  (req, res) => controller.get(req, res),
)

export { router as dashboardRoutes }
