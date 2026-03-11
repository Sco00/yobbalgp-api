import { IDepartureRepository } from '../../domain/repositories/IDepartureRepository.js';
export declare class CloseDepartureUseCase {
    private readonly departureRepo;
    constructor(departureRepo: IDepartureRepository);
    execute(id: string): Promise<void>;
}
//# sourceMappingURL=CloseDepartureUseCase.d.ts.map