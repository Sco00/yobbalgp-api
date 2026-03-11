import { IPackageRepository } from "../../domain/repositories/IPackageRepository.js";
import { type PackageStates } from "../../domain/enums/PackageStates.js";
export declare class UpdatePackageStatusUseCase {
    private readonly packageRepo;
    constructor(packageRepo: IPackageRepository);
    execute(id: string, state: PackageStates): Promise<void>;
}
//# sourceMappingURL=UpdatePackageStatusUseCase.d.ts.map