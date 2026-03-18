import { Prisma } from "@prisma/client";
import { CreatePackageDTO } from "../../../infrastructure/http/validators/package.validators.js";

export type NatureInput = {
  natureId: string
  quantity: number
  price:    number
}

export type SystemFields = {
  reference?: string;
  packageNatures:     NatureInput[]
};

export type PackageWithRelations = Prisma.PackageGetPayload<{
  include: {
    creator:  true
    person:   { include: { personType: true } }
    relay:    { include: { address: true } }
    natures:  { include: { nature: true } }
    statuses: true
    payments: true
    departureGp: {
      include: {
        currency:           true
        departureAddress:   true
        destinationAddress: true
        person:             true
      }
    }
  }
}>

export type CreatePackageProps = Omit<CreatePackageDTO, 'packageNatures'> &
  SystemFields & {
    creatorId: string;
  };
