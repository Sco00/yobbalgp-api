import { Router } from 'express'
import { RelayController } from '../controllers/RelayController.js'
import { AuthMiddleware }  from '../middlewares/AuthMiddleware.js'

const router     = Router()
const controller = new RelayController()

router.use(AuthMiddleware.authenticate)

router.get('/', AuthMiddleware.authorizeAdmin, controller.list)
router.get('/:id', AuthMiddleware.authorizeAdmin, controller.getById)
router.post('/', AuthMiddleware.authorizeAdmin, controller.create)

export { router as relayRoutes }