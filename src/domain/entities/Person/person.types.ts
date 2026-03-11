import { type Prisma } from '@prisma/client'
import { type CreatePersonDTO } from '../../../infrastructure/http/validators/person.validator.js'

export type PersonWithRelations = Prisma.PersonGetPayload<{
  include: {
    personType: true
    account:    true
  }
}>

export type CreatePersonProps = CreatePersonDTO