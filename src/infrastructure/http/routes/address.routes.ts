import { Router }          from 'express'
import { AuthMiddleware }    from '../middlewares/AuthMiddleware.js'
import { container } from '../../config/container.js'

const router     = Router()

// router.use(AuthMiddleware.authorizeAdmin);
router.get('/', container.dadressController.list)
router.get('/:id', container.dadressController.getById)
router.post('/', container.dadressController.create)

export { router as addressRoutes }
