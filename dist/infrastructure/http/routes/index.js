import express from "express";
import { packageRoutes } from "./package.routes.js";
import { accountRoutes } from "./account.routes.js";
import { personRoutes } from "./person.routes.js";
import { departureRoutes } from "./departure.routes.js";
const router = express.Router();
router.use("/accounts", accountRoutes);
router.use("/packages", packageRoutes);
router.use("/persons", personRoutes);
router.use("/departures", departureRoutes);
export default router;
//# sourceMappingURL=index.js.map