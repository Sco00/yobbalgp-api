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

export type CreateRelayProps = CreateRelayDTO