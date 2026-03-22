import { PackageStates } from "../../enums/PackageStates.js";
import { CreatePackageProps, PackageWithRelations } from "./package.types.js";

export class Package {
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
  departureGp?: PackageWithRelations['departureGp'];

  constructor(props: CreatePackageProps | PackageWithRelations) {
    if ('id' in props)this.id = props.id
    this.reference = props.reference;
    this.weight = props.weight;
    if ('isCompleted' in props) this.isCompleted = props.isCompleted;
    if ('isArchived' in props) this.isArchived = props.isArchived;
    this.creatorId = props.creatorId;
    this.personId = props.personId;
    this.relayId = props.relayId ?? null;
    this.departureGpId = props.departureGpId;
    if ('createdAt' in props)this.createdAt = props.createdAt;
    if ('natures' in props) this.natures = props.natures;
    if ('statuses' in props)this.statuses = props.statuses;
    if ('departureGp' in props)this.departureGp = props.departureGp;
  }


  getCurrentStatus(): PackageStates {
    if (!this.statuses || this.statuses.length === 0) return PackageStates.EN_ATTENTE;
    const sorted = [...this.statuses].sort(
      (a, b) => (b.createdAt?.getTime() ?? 0) - (a.createdAt?.getTime() ?? 0),
    );
    return sorted[0]!.state as PackageStates;
  }

  canBeArchived(): boolean {
    const current = this.getCurrentStatus();
    return (
      current === PackageStates.LIVRE || current === PackageStates.RETOURNE
    );
  }

  canBeDeleted(): boolean {
    return this.getCurrentStatus() === PackageStates.EN_ATTENTE;
  }
}
