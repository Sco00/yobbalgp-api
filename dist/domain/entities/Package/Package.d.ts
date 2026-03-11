import { PackageStates } from "../../enums/PackageStates.js";
import { CreatePackageProps, PackageWithRelations } from "./package.types.js";
export declare class Package {
    id?: string;
    reference: string | undefined;
    weight: number;
    isCompleted?: boolean;
    isArchived?: boolean;
    creatorId: string;
    personId: string;
    relayId: string | null;
    creator?: PackageWithRelations["creator"];
    person?: PackageWithRelations["person"];
    relay?: PackageWithRelations["relay"];
    departureGpId: string;
    createdAt: Date | undefined;
    natures?: PackageWithRelations["natures"];
    statuses?: PackageWithRelations["statuses"];
    constructor(props: CreatePackageProps | PackageWithRelations);
    getCurrentStatus(): PackageStates;
    canBeArchived(): boolean;
    canBeDeleted(): boolean;
}
//# sourceMappingURL=Package.d.ts.map