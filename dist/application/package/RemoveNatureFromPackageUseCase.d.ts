import { IPackageRepository } from "../../domain/repositories/IPackageRepository.js";
export declare class RemoveNatureFromPackageUseCase {
    private readonly packageRepo;
    constructor(packageRepo: IPackageRepository);
    execute(packageId: string, natureId: string): Promise<void>;
}
//# sourceMappingURL=RemoveNatureFromPackageUseCase.d.ts.map