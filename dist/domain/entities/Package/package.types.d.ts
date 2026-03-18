import { Prisma } from "@prisma/client";
import { CreatePackageDTO } from "../../../infrastructure/http/validators/package.validators.js";
export type NatureInput = {
    natureId: string;
    quantity: number;
    price: number;
};
export type SystemFields = {
    reference?: string;
    packageNatures: NatureInput[];
};
export type PackageWithRelations = Prisma.PackageGetPayload<{
    include: {
        person: true;
        creator: true;
        natures: true;
        statuses: true;
        relay: true;
    };
}>;
export type CreatePackageProps = Omit<CreatePackageDTO, 'packageNatures'> & SystemFields & {
    creatorId: string;
};
//# sourceMappingURL=package.types.d.ts.map