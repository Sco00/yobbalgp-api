import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { errorHandler } from '../http/middlewares/ErrorHandler.js';
import routes from '../http/routes/index.js';
const app = express();
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use('/api/yobbal/V2/', routes);
app.use(errorHandler);
export default app;
//# sourceMappingURL=app.js.map