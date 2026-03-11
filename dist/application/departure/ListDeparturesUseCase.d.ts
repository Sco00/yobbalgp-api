import { IDepartureRepository, DepartureFilters } from '../../domain/repositories/IDepartureRepository.js';
import { type DepartureWithRelations } from '../../domain/entities/DepartureGp/departure.types.js';
interface ListDeparturesResult {
    props: DepartureWithRelations[];
    total: number;
    page: number;
    limit: number;
}
export declare class ListDeparturesUseCase {
    private readonly departureRepo;
    constructor(departureRepo: IDepartureRepository);
    execute(filters: DepartureFilters): Promise<ListDeparturesResult>;
}
export {};
//# sourceMappingURL=ListDeparturesUseCase.d.ts.map