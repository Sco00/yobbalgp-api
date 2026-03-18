import express from "express"

import { packageRoutes }   from "./package.routes.js"
import { accountRoutes }   from "./account.routes.js"
import { personRoutes }    from "./person.routes.js"
import { departureRoutes } from "./departure.routes.js"
import { paymentRoutes } from "./payment.routes.js"
import { authRoutes } from "./auth.routes.js"
import { relayRoutes } from './relay.routes.js'

const router = express.Router()

router.use("/accounts",   accountRoutes)
router.use("/packages",   packageRoutes)
router.use("/persons",     personRoutes)
router.use("/departures", departureRoutes)
router.use("/payments", paymentRoutes)
router.use("/auth", authRoutes)
router.use('/relays', relayRoutes)

export default router
