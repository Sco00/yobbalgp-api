import { type IPackageRepository } from '../../domain/repositories/IPackageRepository.js';
export declare class ArchivePackageUseCase {
    private readonly packageRepo;
    constructor(packageRepo: IPackageRepository);
    execute(id: string): Promise<void>;
}
//# sourceMappingURL=ArchivePackageUseCase.d.ts.map