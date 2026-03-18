import { Router } from 'express'
import { AuthController } from '../controllers/AuthController.js'


const router     = Router()
const controller = new AuthController()

router.post('/login', controller.login)
// router.post('/refresh',             AuthMiddleware.authorizeAdmin,  controller.refresh)

export { router as authRoutes }