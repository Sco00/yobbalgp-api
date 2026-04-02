import { Router } from 'express'
import { RelayController } from '../controllers/RelayController.js'
import { AuthMiddleware }  from '../middlewares/AuthMiddleware.js'
import { container } from '../../config/container.js'

const router     = Router()

router.use(AuthMiddleware.authenticate)

router.get('/', AuthMiddleware.authorizeAdmin, container.relayController.list)
router.get('/:id', AuthMiddleware.authorizeAdmin, container.relayController.getById)
router.post('/', AuthMiddleware.authorizeAdmin, container.relayController.create)

export { router as relayRoutes }