import { type CreateRelayProps, type RelayWithRelations } from './relay.types.js'

export class Relay {
  id?:       string
  name:      string
  addressId: string
  personId:  string
  createdAt?: Date

  person?:  RelayWithRelations['person']
  address?: RelayWithRelations['address']

  constructor(props: CreateRelayProps | RelayWithRelations) {
    if ('id' in props)        this.id        = props.id
    if ('createdAt' in props) this.createdAt = props.createdAt
    if ('person' in props)    this.person    = props.person
    if ('address' in props)   this.address   = props.address

    this.name      = props.name
    this.addressId = props.addressId
    this.personId  = props.personId
  }
}
