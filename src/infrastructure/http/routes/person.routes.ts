import { Router } from 'express'
import { PersonController } from '../controllers/PersonController.js'
import { AuthMiddleware }   from '../middlewares/AuthMiddleware.js'
import { container } from '../../config/container.js'

const router     = Router()

router.use(AuthMiddleware.authenticate)

router.get('/types', AuthMiddleware.authorizeAdmin, container.personController.listTypes)
router.get('/',      AuthMiddleware.authorizeAdmin, container.personController.list)
router.get('/:id',   AuthMiddleware.authorizeAdmin, container.personController.getById)
router.post('/',     AuthMiddleware.authorizeAdmin, container.personController.create)

export { router as personRoutes }