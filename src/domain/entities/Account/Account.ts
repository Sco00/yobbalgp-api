import { CreateAccountProps, AccountWithRelations } from './account.types.js'

export class Account {
  id?:      string
  email:    string
  password: string
  personId: string
  roleId:   string
  createdAt?: Date

  role?:   AccountWithRelations['role']
  person?: AccountWithRelations['person']

  constructor(props: CreateAccountProps | AccountWithRelations) {
    if ('id' in props)        this.id        = props.id
    if ('createdAt' in props) this.createdAt = props.createdAt
    if ('role' in props)      this.role      = props.role
    if ('person' in props)    this.person    = props.person

    this.email    = props.email
    this.password = props.password
    this.personId = props.personId
    this.roleId   = props.roleId
  }

  getFullName(): string {
    return this.person
      ? `${this.person.firstName} ${this.person.lastName}`
      : ''
  }

  isAdmin(): boolean {
    return this.role?.name === 'ADMIN'
  }

  isClient(): boolean {
    return this.role?.name === 'CLIENT'
  }
}
