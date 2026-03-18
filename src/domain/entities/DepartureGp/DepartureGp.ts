import { type DepartureGp as PrismaDepartureGp } from '@prisma/client'
import { type CreateDepartureProps, type DepartureWithRelations } from './departure.types.js'

export class DepartureGp {
  id?:                  PrismaDepartureGp['id']
  departureDate:        PrismaDepartureGp['departureDate']
  deadline:             PrismaDepartureGp['deadline']
  arrivalDate?:         PrismaDepartureGp['arrivalDate']
  price:                PrismaDepartureGp['price']
  priceGp:              PrismaDepartureGp['priceGp']
  currencyId:           PrismaDepartureGp['currencyId']
  departureAddressId:   PrismaDepartureGp['departureAddressId']
  destinationAddressId: PrismaDepartureGp['destinationAddressId']
  personId?:            PrismaDepartureGp['personId']
  creatorId:            PrismaDepartureGp['creatorId']
  insurancePrice?:      PrismaDepartureGp['insurancePrice']
  isClosed:             PrismaDepartureGp['isClosed']
  createdAt?:           PrismaDepartureGp['createdAt']

  currency?:            DepartureWithRelations['currency']
  departureAddress?:    DepartureWithRelations['departureAddress']
  destinationAddress?:  DepartureWithRelations['destinationAddress']
  person?:              DepartureWithRelations['person']
  creator?:             DepartureWithRelations['creator']
  constructor(props: CreateDepartureProps | DepartureWithRelations) {
    if ('id' in props) this.id = props.id
    this.departureDate        = props.departureDate
    this.deadline             = props.deadline
    this.price                = props.price
    this.priceGp              = props.priceGp
    this.currencyId           = props.currencyId
    this.departureAddressId   = props.departureAddressId
    this.destinationAddressId = props.destinationAddressId
    this.personId             = props.personId ?? null
    this.creatorId            = props.creatorId
    this.insurancePrice       = props.insurancePrice ?? null
    if ('isClosed' in props)   this.isClosed    = props.isClosed
    else                       this.isClosed    = false
    this.arrivalDate = props.arrivalDate
    if ('createdAt' in props)  this.createdAt   = props.createdAt
    if ('currency' in props)   this.currency    = props.currency
    if ('departureAddress' in props) this.departureAddress = props.departureAddress
    if ('destinationAddress' in props) this.destinationAddress = props.destinationAddress
    if ('person' in props)     this.person      = props.person
    if ('creator' in props)    this.creator     = props.creator
  }

  canBeClosed(): boolean {
    return !this.isClosed
  }

  isDeadlinePassed(): boolean {
    return this.deadline < new Date()
  }

  canAddPackage(): boolean {
    return !this.isClosed && !this.isDeadlinePassed()
  }
}
