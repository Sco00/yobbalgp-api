import { Router, Request, Response } from 'express'
import { AuthMiddleware }            from '../middlewares/AuthMiddleware.js'
import prisma                        from '../../config/prisma.js'
import { ResponseFormatter }         from '../middlewares/ReponseFormatter.js'

const router = Router()

router.use(AuthMiddleware.authenticate)

router.get('/', AuthMiddleware.authorizeAdmin, async (_req: Request, res: Response) => {
  const natures = await prisma.nature.findMany({ orderBy: { name: 'asc' } })
  ResponseFormatter.success(res, natures, 'Natures récupérées')
})

export { router as natureRoutes }
