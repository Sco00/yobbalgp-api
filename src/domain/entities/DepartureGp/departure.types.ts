import { Prisma } from "@prisma/client";
import { CreateDepartureDTO } from "../../../infrastructure/http/validators/departure.validator.js";

export type DepartureWithRelations = Prisma.DepartureGpGetPayload<{
  include: {
    currency:           true
    departureAddress:   true
    destinationAddress: true
    person:             true
    creator:            true
    statuses:           true
  }
}>

export type DepartureWithPackages = Prisma.DepartureGpGetPayload<{
  include: {
    currency:           true
    departureAddress:   true
    destinationAddress: true
    person:             true
    creator:            true
    statuses:           true
    packages: {
      include: {
        statuses: true
      }
    }
  }
}>

export type CreateDepartureProps = CreateDepartureDTO & {
  creatorId:  string
}
