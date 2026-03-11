import { type Person as PrismaPerson } from '@prisma/client'
import { CreatePersonProps, PersonWithRelations } from './person.types.js'

export class Person {
  id?:          string
  firstName:    PrismaPerson['firstName']
  lastName:     PrismaPerson['lastName']
  mobile:       PrismaPerson['mobile']
  personTypeId: PrismaPerson['personTypeId']
  createdAt?:   PrismaPerson['createdAt']

  personType?: PersonWithRelations['personType']
  account?:    PersonWithRelations['account']

  constructor(props: CreatePersonProps | PersonWithRelations) {
    if ('id' in props)         this.id         = props.id
    if ('createdAt' in props)  this.createdAt  = props.createdAt
    if ('personType' in props) this.personType = props.personType
    if ('account' in props)    this.account    = props.account

    this.firstName    = props.firstName
    this.lastName     = props.lastName
    this.mobile       = props.mobile       ?? null
    this.personTypeId = props.personTypeId
  }

  getFullName(): string {
    return `${this.firstName} ${this.lastName}`
  }

  hasAccount(): boolean {
    return !!this.account
  }
}