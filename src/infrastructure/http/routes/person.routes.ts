import { Router } from 'express'
import { AuthMiddleware }   from '../middlewares/AuthMiddleware.js'
import { container } from '../../config/container.js'

const router     = Router()

// router.use(AuthMiddleware.authorizeAdmin);
router.get('/types', container.personController.listTypes)
router.get('/', container.personController.list)
router.get('/:id', container.personController.getById)
router.post('/', container.personController.create)

export { router as personRoutes }