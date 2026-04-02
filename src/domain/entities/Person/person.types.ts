import { type Prisma } from '@prisma/client'
import { type CreatePersonInput } from '../../../application/dtos/person.dtos.js'

export type PersonWithRelations = Prisma.PersonGetPayload<{
  include: {
    personType: true
    _count: { select: { packages: true } }
  }
}>

export type PersonListItem = PersonWithRelations & { totalSpent: number }

export type PersonDetailWithRelations = Prisma.PersonGetPayload<{
  include: {
    personType: true
    _count: { select: { packages: true } }
    account: { include: { role: true } }
    packages: {
      include: {
        statuses: true
        natures: { include: { nature: true } }
        payments: { include: { currency: true; paymentMethod: true } }
        departureGp: {
          include: {
            currency: true
            departureAddress: true
            destinationAddress: true
          }
        }
      }
    }
    relays: { include: { address: true } }
  }
}>

export type CreatePersonProps = CreatePersonInput