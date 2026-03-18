import { INatureRepository } from "../../domain/repositories/INatureRepository.js";
import { IPackageRepository } from "../../domain/repositories/IPackageRepository.js";
import { PackageNaturesDTO } from "../../infrastructure/http/validators/package.validators.js";
export declare class AddNatureToPackageUseCase {
    private readonly packageRepo;
    private readonly natureRepo;
    constructor(packageRepo: IPackageRepository, natureRepo: INatureRepository);
    execute(packageId: string, input: PackageNaturesDTO): Promise<void>;
}
//# sourceMappingURL=AddNatureToPackageUseCase.d.ts.map