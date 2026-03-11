import { IPackageRepository, PackageFilters } from "../../domain/repositories/IPackageRepository.js";
import { PackageWithRelations } from "../../domain/entities/Package/package.types.js";
interface ListPackagesResult {
    props: PackageWithRelations[];
    total: number;
    page: number;
    limit: number;
}
export declare class ListPackagesUseCase {
    private readonly packageRepo;
    constructor(packageRepo: IPackageRepository);
    execute(filters: PackageFilters): Promise<ListPackagesResult>;
}
export {};
//# sourceMappingURL=ListPackagesUseCase.d.ts.map