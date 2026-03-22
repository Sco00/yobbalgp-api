import { Router } from 'express'
import { PersonController } from '../controllers/PersonController.js'
import { AuthMiddleware }   from '../middlewares/AuthMiddleware.js'

const router     = Router()
const controller = new PersonController()

router.use(AuthMiddleware.authenticate)

router.get('/types', AuthMiddleware.authorizeAdmin, controller.listTypes)
router.get('/',      AuthMiddleware.authorizeAdmin, controller.list)
router.get('/:id',   AuthMiddleware.authorizeAdmin, controller.getById)
router.post('/',     AuthMiddleware.authorizeAdmin, controller.create)

export { router as personRoutes }