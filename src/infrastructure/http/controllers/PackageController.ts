import { Request, Response, NextFunction } from 'express'
import {CreatePackageSchema, UpdatePackageStatusSchema, PackageFiltersSchema, PackageNatureSchema,} from '../validators/package.validators.js'
import { container } from '../../config/container.js'
import { ResponseFormatter } from '../middlewares/ReponseFormatter.js';
import { SuccessMessages } from '../../../shared/messages/SuccessMessagesFr.js';
import { HttpStatusCode } from '../../../shared/errors/StatusCode.js';

export class PackageController {

    create = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
            const dto = CreatePackageSchema.parse(req.body);
            const result = await container.createPackageUseCase.execute({ ...dto, creatorId: req.user!.id });
            ResponseFormatter.success(res, result, SuccessMessages.COLIS_CREE, HttpStatusCode.CREATED)
    }

    async list (req: Request, res: Response, next: NextFunction): Promise<void> {
        const filters = PackageFiltersSchema.parse(req.query);
        const result = await container.listPackagesUseCase.execute(filters);
        ResponseFormatter.success(res, result, SuccessMessages.COLIS_RECUPERES);
    }

    async getById (req: Request, res: Response, next: NextFunction): Promise<void> {
        const result  = await container.getPackageByIdUseCase.execute(req.params.id as string);
        ResponseFormatter.success(res, result, SuccessMessages.COLIS_RECUPERE);
    }

    async updateStatus (req: Request, res: Response, next: NextFunction): Promise<void> {
        const { state } = UpdatePackageStatusSchema.parse(req.body);
        await container.updatePackageStatusUseCase.execute(req.params.id as string, state);
        ResponseFormatter.success(res, null, SuccessMessages.COLIS_STATUT_MODIFIE);
    }

    async archive (req: Request, res: Response, next: NextFunction): Promise<void> {
        await container.archivePackageUseCase.execute(req.params.id as string);
        ResponseFormatter.success(res, null, SuccessMessages.COLIS_ARCHIVE);
    }

    async delete(req: Request, res: Response, next: NextFunction): Promise<void>  {
        await container.deletePackageUseCase.execute(req.params.id as string);
        ResponseFormatter.success(res, null, SuccessMessages.COLIS_SUPPRIME);
    }

    addNature = async (req: Request, res: Response): Promise<void> => {
        const dto = PackageNatureSchema.parse(req.body)
        await container.addNatureToPackageUseCase.execute(req.params.id as string, dto)
        res.status(201).json({ success: true, message: SuccessMessages.COLIS_MODIFIE, data: null })
    }

    removeNature = async (req: Request, res: Response): Promise<void> => {
        await container.removeNatureFromPackageUseCase.execute(
        req.params.id as string,
        req.params.natureId as string
        )
        res.json({ success: true, message: SuccessMessages.COLIS_MODIFIE, data: null })
    }

    quote = async (req: Request, res: Response): Promise<void> => {
        const packageId = req.params.id as string
        const buffer    = await container.generateQuoteUseCase.execute(req.params.id as string)

        res.setHeader('Content-Type', 'application/pdf')
        res.setHeader('Content-Disposition', `inline; filename="devis-${packageId}.pdf"`)
        res.setHeader('Content-Length', String(buffer.length))
        res.end(buffer)
    }
}