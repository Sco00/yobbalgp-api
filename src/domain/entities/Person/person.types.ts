import { type Prisma } from '@prisma/client'
import { type CreatePersonDTO } from '../../../infrastructure/http/validators/person.validator.js'

export type PersonWithRelations = Prisma.PersonGetPayload<{
  include: {
    personType: true
  }
}>

export type CreatePersonProps = CreatePersonDTO