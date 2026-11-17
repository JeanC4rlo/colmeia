interface BaseDTOs {
    create?: any;
    update?: any;
}

export default function createCrudRepository<
    T,
    D extends BaseDTOs = BaseDTOs,
    IdType extends string | number = number | string,
    Excludes extends keyof ReturnType<typeof buildMethods> = never,
>(modelDelegate: any) {
    const buildMethods = () => ({
        async find(id: IdType): Promise<T | null> {
            return modelDelegate.findUnique({ where: { id } });
        },
        async create(
            data: D extends { create: infer C } ? C : any,
        ): Promise<T> {
            return modelDelegate.create({ data });
        },
        async update(
            id: string,
            data: D extends { update: infer U } ? U : any,
        ): Promise<T> {
            return modelDelegate.update({ where: { id }, data });
        },
        async delete(id: number): Promise<T> {
            return modelDelegate.delete({ where: { id } });
        },
        async deleteMany(idList: number[]): Promise<{ count: number }> {
            return modelDelegate.deleteMany({
                where: { id: { in: idList } },
            });
        },
    });

    type AllMethods = ReturnType<typeof buildMethods>;
    return buildMethods() as Omit<AllMethods, Excludes>;
}
