import { IPackageRepository } from "../../domain/repositories/IPackageRepository.js";
import { type PackageWithRelations } from "../../domain/entities/Package/package.types.js";
export declare class GetPackageByIdUseCase {
    private readonly packageRepo;
    constructor(packageRepo: IPackageRepository);
    execute(id: string): Promise<PackageWithRelations>;
}
//# sourceMappingURL=GetPackageByIdUseCase.d.ts.map