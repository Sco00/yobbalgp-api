import { Prisma } from "@prisma/client";
import { CreateDepartureDTO } from "../../../infrastructure/http/validators/departure.validator.js";
export type DepartureWithRelations = Prisma.DepartureGpGetPayload<{
    include: {
        currency: true;
        departureAddress: true;
        destinationAddress: true;
        person: true;
        creator: true;
        packages: true;
    };
}>;
export type CreateDepartureProps = CreateDepartureDTO & {
    creatorId: string;
    id?: string;
    createdAt?: Date;
};
//# sourceMappingURL=departure.types.d.ts.map