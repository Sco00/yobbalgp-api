import { Prisma } from "@prisma/client";
import { type CreateDepartureInput } from "../../../application/dtos/departure.dtos.js";

export const departureInclude = {
  currency:           true,
  departureAddress:   true,
  destinationAddress: true,
  person:             { include: { personType: true } },
  creator:            true,
  statuses:           true,
} as const

export const departureListInclude = {
  currency:           true,
  departureAddress:   true,
  destinationAddress: true,
  person:             true,
  statuses:           true,
} as const

export const departureWithPackagesInclude = {
  currency:           true,
  departureAddress:   true,
  destinationAddress: true,
  person:             { include: { personType: true } },
  creator:            true,
  statuses:           true,
  packages: {
    include: {
      statuses: true,
    },
  },
} as const

export type DepartureWithRelations = Prisma.DepartureGpGetPayload<{ include: typeof departureInclude }>
export type DepartureListItem      = Prisma.DepartureGpGetPayload<{ include: typeof departureListInclude }>
export type DepartureWithPackages  = Prisma.DepartureGpGetPayload<{ include: typeof departureWithPackagesInclude }>

export type CreateDepartureProps = CreateDepartureInput
