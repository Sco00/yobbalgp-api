import { type PackageWithRelations, CreatePackageProps, NatureInput } from '../entities/Package/package.types.js';
import { type PackageStates } from '../enums/PackageStates.js';
import { IRepository } from './IRepository.js';
export interface PackageFilters {
    state?: PackageStates | undefined;
    departureDateFrom?: Date | undefined;
    departureCountry?: string | undefined;
    destinationCountry?: string | undefined;
    currencyId?: string | undefined;
    page: number;
    limit: number;
}
export interface IPackageRepository extends Omit<IRepository<PackageWithRelations, PackageFilters>, 'save' | 'update'> {
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
    addNature(packageId: string, nature: NatureInput): Promise<void>;
    removeNature(packageId: string, natureId: string): Promise<void>;
}
//# sourceMappingURL=IPackageRepository.d.ts.map