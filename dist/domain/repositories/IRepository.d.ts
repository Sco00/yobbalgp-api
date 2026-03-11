export interface IRepository<T, F, updateDTO = Partial<T>> {
    save(props: Omit<T, "id" | "createAt">): Promise<T>;
    findById(id: string): Promise<T | null>;
    findAll(filters?: F): Promise<{
        props: T[];
        total: number;
    }>;
    update(id: string, props: updateDTO): Promise<void>;
    delete(id: string): Promise<void>;
}
//# sourceMappingURL=IRepository.d.ts.map