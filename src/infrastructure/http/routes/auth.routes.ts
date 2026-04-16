import { Router } from 'express'
import { container } from '../../config/container.js'


const router     = Router()

router.post('/login', container.authController.login)
router.post('/refresh', container.authController.refresh)

export { router as authRoutes }