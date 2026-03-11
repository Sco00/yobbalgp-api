import { IDepartureRepository } from '../../domain/repositories/IDepartureRepository.js';
import { type DepartureWithRelations } from '../../domain/entities/DepartureGp/departure.types.js';
import { type CreateDepartureDTO } from '../../infrastructure/http/validators/departure.validator.js';
interface CreateDepartureInput extends CreateDepartureDTO {
    creatorId: string;
}
export declare class CreateDepartureUseCase {
    private readonly departureRepo;
    constructor(departureRepo: IDepartureRepository);
    execute(input: CreateDepartureInput): Promise<DepartureWithRelations>;
}
export {};
//# sourceMappingURL=CreateDepartureUseCase.d.ts.map