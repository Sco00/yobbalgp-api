import { Router } from 'express'
import { container } from '../../config/container.js'
import { AuthMiddleware }    from '../middlewares/AuthMiddleware.js'

const router     = Router()

// router.use(AuthMiddleware.authenticate)

router.get('/', container.packageController.list)
router.get('/:id', container.packageController.getById)

router.post('/',  AuthMiddleware.authorizeAdmin, container.packageController.create)
router.patch('/:id/status', AuthMiddleware.authorizeAdmin, container.packageController.updateStatus)
router.patch('/:id/archive', AuthMiddleware.authorizeAdmin, container.packageController.archive)
router.delete('/:id', AuthMiddleware.authorizeAdmin, container.packageController.delete)
router.post('/:id/natures', AuthMiddleware.authorizeAdmin, container.packageController.addNature)
router.delete('/:id/natures/:natureId', AuthMiddleware.authorizeAdmin, container.packageController.removeNature)
router.get('/:id/quote', AuthMiddleware.authenticate, AuthMiddleware.authorizeClient, container.packageController.quote)

export { router as packageRoutes }