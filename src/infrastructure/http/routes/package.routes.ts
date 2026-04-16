import { Router } from 'express'
import { container } from '../../config/container.js'
import { AuthMiddleware }    from '../middlewares/AuthMiddleware.js'

const router     = Router()

// router.use(AuthMiddleware.authorizeClient)
router.get('/', container.packageController.list)
router.get('/:id', container.packageController.getById)

router.get('/:id/quote', AuthMiddleware.authorizeClient, container.packageController.quote)

// router.use(AuthMiddleware.authorizeAdmin);

router.post('/', container.packageController.create)
router.patch('/:id/status', container.packageController.updateStatus)
router.patch('/:id/archive', container.packageController.archive)
router.delete('/:id', container.packageController.delete)
router.post('/:id/natures', container.packageController.addNature)
router.delete('/:id/natures/:natureId', container.packageController.removeNature)

export { router as packageRoutes }