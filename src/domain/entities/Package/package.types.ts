import { Prisma } from "@prisma/client";
import { type CreatePackageInput } from "../../../application/dtos/package.dtos.js";

export type NatureInput = {
  natureId: string
  quantity: number
  price:    number
}

export type SystemFields = {
  reference?: string;
  packageNatures: NatureInput[]
};

export const packageInclude = {
  creator:  true,
  person:   { include: { personType: true } },
  relay:    { include: { address: true } },
  natures:  { include: { nature: true } },
  statuses: true,
  payments: true,
  departureGp: {
    include: {
      currency:           true,
      departureAddress:   true,
      destinationAddress: true,
      person:             true,
    },
  },
} as const

export const packageListInclude = {
  person:   true,
  natures:  { include: { nature: true } },
  statuses: true,
  departureGp: {
    include: {
      departureAddress:   true,
      destinationAddress: true,
    },
  },
} as const

export type PackageWithRelations = Prisma.PackageGetPayload<{ include: typeof packageInclude }>
export type PackageListItem      = Prisma.PackageGetPayload<{ include: typeof packageListInclude }>

export type CreatePackageProps = Omit<CreatePackageInput, 'packageNatures'> & SystemFields;
