import { Nature } from '@prisma/client';
export interface INatureRepository {
    findById(id: string): Promise<Nature | null>;
}
//# sourceMappingURL=INatureRepository.d.ts.map