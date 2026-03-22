import { Router, Request, Response } from 'express'
import { AuthMiddleware }            from '../middlewares/AuthMiddleware.js'
import prisma                        from '../../config/prisma.js'
import { ResponseFormatter }         from '../middlewares/ReponseFormatter.js'
import { AddressType }               from '@prisma/client'

const router = Router()

router.use(AuthMiddleware.authenticate)

router.get('/currencies', AuthMiddleware.authorizeAdmin, async (_req: Request, res: Response) => {
  const currencies = await prisma.currency.findMany({ orderBy: { code: 'asc' } })
  ResponseFormatter.success(res, currencies, 'Devises récupérées')
})

router.get('/payment-methods', AuthMiddleware.authorizeAdmin, async (_req: Request, res: Response) => {
  const methods = await prisma.paymentMethod.findMany({ orderBy: { name: 'asc' } })
  ResponseFormatter.success(res, methods, 'Méthodes de paiement récupérées')
})

router.get('/addresses', AuthMiddleware.authorizeAdmin, async (req: Request, res: Response) => {
  const type = req.query.type === 'RELAIS' ? AddressType.RELAIS : AddressType.SIMPLE
  const addresses = await prisma.address.findMany({
    where:   { type },
    orderBy: [{ country: 'asc' }, { city: 'asc' }],
  })
  ResponseFormatter.success(res, addresses, 'Adresses récupérées')
})

router.get('/roles', AuthMiddleware.authorizeAdmin, async (_req: Request, res: Response) => {
  const roles = await prisma.role.findMany({ orderBy: { name: 'asc' } })
  ResponseFormatter.success(res, roles, 'Rôles récupérés')
})

export { router as referenceRoutes }
