import { Router } from 'express';
import { AccountController } from '../controllers/AccountController.js';
import { AuthMiddleware } from '../middlewares/AuthMiddleware.js';
const router = Router();
const controller = new AccountController();
router.post('/login', controller.login);
router.post('/', AuthMiddleware.authenticate, AuthMiddleware.authorizeAdmin, controller.create);
export { router as accountRoutes };
//# sourceMappingURL=account.routes.js.map