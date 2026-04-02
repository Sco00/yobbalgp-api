import { CreatePersonProps, PersonWithRelations } from './person.types.js'

export class Person {
  id?:          string
  firstName:    string
  lastName:     string
  mobile:       string
  personTypeId: string
  createdAt?:   Date

  personType?: PersonWithRelations['personType']

  constructor(props: CreatePersonProps | PersonWithRelations) {
    if ('id' in props)         this.id         = props.id
    if ('createdAt' in props)  this.createdAt  = props.createdAt
    if ('personType' in props) this.personType = props.personType

    this.firstName    = props.firstName
    this.lastName     = props.lastName
    this.mobile       = props.mobile
    this.personTypeId = props.personTypeId
  }

  getFullName(): string {
    return `${this.firstName} ${this.lastName}`
  }
}
