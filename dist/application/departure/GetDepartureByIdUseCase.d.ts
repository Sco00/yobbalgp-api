import { IDepartureRepository } from '../../domain/repositories/IDepartureRepository.js';
import { type DepartureWithRelations } from '../../domain/entities/DepartureGp/departure.types.js';
export declare class GetDepartureByIdUseCase {
    private readonly departureRepo;
    constructor(departureRepo: IDepartureRepository);
    execute(id: string): Promise<DepartureWithRelations>;
}
//# sourceMappingURL=GetDepartureByIdUseCase.d.ts.map