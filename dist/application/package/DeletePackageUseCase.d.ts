import { IPackageRepository } from '../../domain/repositories/IPackageRepository.js';
export declare class DeletePackageUseCase {
    private readonly packageRepo;
    constructor(packageRepo: IPackageRepository);
    execute(id: string): Promise<void>;
}
//# sourceMappingURL=DeletePackageUseCase.d.ts.map