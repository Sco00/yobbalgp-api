import { Router } from 'express'
import { container } from '../../config/container.js'
import { AuthMiddleware } from '../middlewares/AuthMiddleware.js'

const router = Router()

// router.use(AuthMiddleware.authenticate)

router.get('/', AuthMiddleware.authenticate, AuthMiddleware.authorizeClient, container.departureController.list)
router.get('/:id', AuthMiddleware.authenticate, AuthMiddleware.authorizeClient,container.departureController.getById)
router.post('/', AuthMiddleware.authenticate, AuthMiddleware.authorizeAdmin,  container.departureController.create)
router.patch('/:id/close', AuthMiddleware.authenticate, AuthMiddleware.authorizeAdmin,  container.departureController.close)

export { router as departureRoutes }
