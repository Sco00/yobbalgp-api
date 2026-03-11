import { Request, Response, NextFunction } from 'express';
export declare class DepartureController {
    create: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    list(req: Request, res: Response, next: NextFunction): Promise<void>;
    getById(req: Request, res: Response, next: NextFunction): Promise<void>;
    close(req: Request, res: Response, next: NextFunction): Promise<void>;
}
//# sourceMappingURL=DepartureController.d.ts.map