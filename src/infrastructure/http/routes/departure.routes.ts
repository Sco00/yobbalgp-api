import { Router } from 'express'
import { container } from '../../config/container.js'
import { AuthMiddleware } from '../middlewares/AuthMiddleware.js'

const router = Router()

// router.use(AuthMiddleware.authorizeClient);
router.get('/', container.departureController.list)
router.get('/:id',container.departureController.getById)

// router.use(AuthMiddleware.authorizeAdmin);
router.post('/', container.departureController.create)
router.patch('/:id/close', container.departureController.close)
router.patch('/:id/state', container.departureController.updateState)

export { router as departureRoutes }
