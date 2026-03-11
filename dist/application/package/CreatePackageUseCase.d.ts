import { IPackageRepository } from "../../domain/repositories/IPackageRepository.js";
import { IDepartureRepository } from "../../domain/repositories/IDepartureRepository.js";
import { PackageWithRelations } from "../../domain/entities/Package/package.types.js";
import { CreatePackageDTO } from "../../infrastructure/http/validators/package.validators.js";
import { INatureRepository } from "../../domain/repositories/INatureRepository.js";
interface CreatePackageInput extends CreatePackageDTO {
    creatorId: string;
}
export declare class CreatePackageUseCase {
    private readonly packageRepo;
    private readonly departureRepo;
    private readonly natureRepo;
    constructor(packageRepo: IPackageRepository, departureRepo: IDepartureRepository, natureRepo: INatureRepository);
    execute(input: CreatePackageInput): Promise<PackageWithRelations>;
}
export {};
//# sourceMappingURL=CreatePackageUseCase.d.ts.map