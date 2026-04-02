import { type CreateDepartureProps, type DepartureWithRelations } from './departure.types.js'
import { DepartureStates } from '../../enums/DepartureStates.js'

type DepartureStatusItem = { id: string; state: string; createdAt: Date }

export class DepartureGp {
  id?:                  string
  departureDate:        Date
  deadline:             Date
  arrivalDate?:         Date
  price:                number
  priceGp:              number
  currencyId:           string
  departureAddressId:   string
  destinationAddressId: string
  personId?:            string | null
  creatorId:            string
  insurancePrice?:      number | null
  isClosed:             boolean
  createdAt?:           Date

  currency?:            DepartureWithRelations['currency']
  departureAddress?:    DepartureWithRelations['departureAddress']
  destinationAddress?:  DepartureWithRelations['destinationAddress']
  person?:              DepartureWithRelations['person']
  creator?:             DepartureWithRelations['creator']
  statuses?:            DepartureStatusItem[]

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
    if ('statuses' in props)   this.statuses    = props.statuses
  }

  getCurrentState(): DepartureStates {
    if (!this.statuses || this.statuses.length === 0) return DepartureStates.EN_ATTENTE
    const sorted = [...this.statuses].sort(
      (a, b) => b.createdAt.getTime() - a.createdAt.getTime()
    )
    return sorted[0]!.state as DepartureStates
  }

  canBeClosed(): boolean {
    return !this.isClosed && this.getCurrentState() === DepartureStates.EN_ATTENTE
  }

  isDeadlinePassed(): boolean {
    return this.deadline < new Date()
  }

  canAddPackage(): boolean {
    return !this.isClosed && this.getCurrentState() === DepartureStates.EN_ATTENTE
  }
}
