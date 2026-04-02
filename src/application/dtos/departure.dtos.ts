export interface CreateDepartureInput {
  departureDate:        Date
  arrivalDate:          Date
  deadline:             Date
  price:                number
  priceGp:              number
  currencyId:           string
  departureAddressId:   string
  destinationAddressId: string
  personId?:            string | undefined
  insurancePrice?:      number | undefined
  creatorId:            string
}
