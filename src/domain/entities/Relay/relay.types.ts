import { type Prisma } from '@prisma/client'
import { type CreateRelayDTO } from '../../../infrastructure/http/validators/relay.validator.js'

export type RelayWithRelations = Prisma.RelayGetPayload<{
  include: {
    person:  true
    address: true
    _count: {
      select: { packages: true }
    }
  }
}>

export type RelayDetailWithRelations = Prisma.RelayGetPayload<{
  include: {
    person:  true
    address: true
    _count: {
      select: { packages: true }
    }
    packages: {
      include: {
        statuses:    true
        person:      true
        natures:     { include: { nature: true } }
        payments:    { include: { currency: true; paymentMethod: true } }
        departureGp: { include: { departureAddress: true; destinationAddress: true } }
      }
    }
  }
}>

export type CreateRelayProps = CreateRelayDTO