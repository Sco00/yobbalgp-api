import { type IPersonRepository } from '../../domain/repositories/IPersonRepository.js';
import { type Person } from '@prisma/client';
import { type CreatePersonDTO } from '../../infrastructure/http/validators/person.validator.js';
export declare class CreatePersonUseCase {
    private readonly personRepo;
    constructor(personRepo: IPersonRepository);
    execute(dto: CreatePersonDTO, throwIfExisjs?: boolean): Promise<Person>;
}
//# sourceMappingURL=CreatePersonUseCase.d.ts.map