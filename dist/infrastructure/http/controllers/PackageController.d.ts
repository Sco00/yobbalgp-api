import { Request, Response, NextFunction } from 'express';
export declare class PackageController {
    create: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    list(req: Request, res: Response, next: NextFunction): Promise<void>;
    getById(req: Request, res: Response, next: NextFunction): Promise<void>;
    updateStatus(req: Request, res: Response, next: NextFunction): Promise<void>;
    archive(req: Request, res: Response, next: NextFunction): Promise<void>;
    delete(req: Request, res: Response, next: NextFunction): Promise<void>;
}
//# sourceMappingURL=PackageController.d.ts.map