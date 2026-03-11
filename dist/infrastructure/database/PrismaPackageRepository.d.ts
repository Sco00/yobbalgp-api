import { type IPackageRepository, type PackageFilters } from '../../domain/repositories/IPackageRepository.js';
import { PackageWithRelations, CreatePackageProps } from '../../domain/entities/Package/package.types.js';
import { type PackageStates } from '../../domain/enums/PackageStates.js';
export declare class PrismaPackageRepository implements IPackageRepository {
    save(props: CreatePackageProps): Promise<PackageWithRelations>;
    findById(id: string): Promise<PackageWithRelations | null>;
    findAll(filters?: PackageFilters): Promise<{
        props: PackageWithRelations[];
        total: number;
    }>;
    updateStatus(packageId: string, state: PackageStates): Promise<void>;
    archive(packageId: string): Promise<void>;
    delete(packageId: string): Promise<void>;
    getLastReference(): Promise<string | null>;
}
//# sourceMappingURL=PrismaPackageRepository.d.ts.map