import { INatureRepository } from '../../domain/repositories/INatureRepository.js';
import { Nature } from '@prisma/client';
export declare class PrismaNatureRepository implements INatureRepository {
    findById(id: string): Promise<Nature | null>;
}
//# sourceMappingURL=PrismaNatureRepository.d.ts.map