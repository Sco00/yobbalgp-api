import { Router }          from 'express'
import { AddressController } from '../controllers/AddressController.js'
import { AuthMiddleware }    from '../middlewares/AuthMiddleware.js'
import { container } from '../../config/container.js'

const router     = Router()

router.use(AuthMiddleware.authenticate)

router.get('/',    AuthMiddleware.authorizeAdmin, container.dadressController.list)
router.get('/:id', AuthMiddleware.authorizeAdmin, container.dadressController.getById)
router.post('/',   AuthMiddleware.authorizeAdmin, container.dadressController.create)

export { router as addressRoutes }
