import { IPersonRepository, PersonFilters } from "../../domain/repositories/IPersonRepository.js";
import { PersonWithRelations } from "../../domain/entities/Person/person.types.js";
interface ListPackagesResult {
    props: PersonWithRelations[];
    total: number;
    page: number;
    limit: number;
}
export declare class ListPersonsUseCase {
    private readonly packageRepo;
    constructor(packageRepo: IPersonRepository);
    execute(filters: PersonFilters): Promise<ListPackagesResult>;
}
export {};
//# sourceMappingURL=ListPersonsUseCase.d.ts.map