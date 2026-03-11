import { IPersonRepository, PersonFilters } from "../../domain/repositories/IPersonRepository.js";
import { Person } from "@prisma/client";
import { CreatePersonProps, PersonWithRelations } from "../../domain/entities/Person/person.types.js";
export declare class PrismaPersonRepository implements IPersonRepository {
    save(props: CreatePersonProps): Promise<PersonWithRelations>;
    findById(id: string): Promise<PersonWithRelations | null>;
    findByMobile(mobile: string): Promise<PersonWithRelations | null>;
    findAll(filters: PersonFilters): Promise<{
        props: PersonWithRelations[];
        total: number;
    }>;
    update(id: string, props: Partial<Person>): Promise<void>;
    delete(id: string): Promise<void>;
}
//# sourceMappingURL=PrismaPersonRepository.d.ts.map