import { Router } from 'express'
import { AuthMiddleware }  from '../middlewares/AuthMiddleware.js'
import { container } from '../../config/container.js'

const router     = Router()

// router.use(AuthMiddleware.authorizeAdmin);
router.get('/', container.relayController.list)
router.get('/:id', container.relayController.getById)
router.post('/', container.relayController.create)

export { router as relayRoutes }