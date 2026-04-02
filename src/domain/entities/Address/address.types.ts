import { type Prisma }             from '@prisma/client'
import { type CreateAddressInput } from '../../../application/dtos/address.dtos.js'

export type AddressWithRelations = Prisma.AddressGetPayload<{
  include: {
    relays: true
  }
}>

export const addressDetailInclude = {
  relays: {
    include: { person: true },
  },
  departureGpsDepartures: {
    include: {
      destinationAddress: true,
      person:             true,
      statuses:           true,
    },
  },
  departureGpsDestinations: {
    include: {
      departureAddress: true,
      person:           true,
      statuses:         true,
    },
  },
} as const satisfies Prisma.AddressInclude

export type AddressDetailWithRelations = Prisma.AddressGetPayload<{
  include: typeof addressDetailInclude
}>

export type { CreateAddressInput }
export type CreateAddressProps = CreateAddressInput & { addressHash: string }
