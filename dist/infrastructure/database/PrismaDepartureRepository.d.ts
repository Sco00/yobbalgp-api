import { type IDepartureRepository, type DepartureFilters } from '../../domain/repositories/IDepartureRepository.js';
import { type DepartureWithRelations, type CreateDepartureProps } from '../../domain/entities/DepartureGp/departure.types.js';
export declare class PrismaDepartureRepository implements IDepartureRepository {
    save(props: CreateDepartureProps): Promise<DepartureWithRelations>;
    findById(id: string): Promise<DepartureWithRelations | null>;
    findAll(filters?: DepartureFilters): Promise<{
        props: DepartureWithRelations[];
        total: number;
    }>;
    update(id: string, props: Partial<DepartureWithRelations>): Promise<void>;
    delete(id: string): Promise<void>;
    close(id: string): Promise<void>;
}
//# sourceMappingURL=PrismaDepartureRepository.d.ts.map