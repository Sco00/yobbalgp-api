export interface PackagePaymentInput {
  amount:           number
  currencyId:       string
  paymentMethodId:  string
  remise?:          number       | undefined
  remiseReason?:    string       | undefined
  insurancePrice?:  number       | undefined
}

export interface CreatePackageInput {
  weight:          number
  departureGpId:   string
  personId:        string
  relayId?:        string | null | undefined
  creatorId:       string
  packageNatures:  { natureId: string; quantity: number }[]
  payment?:        PackagePaymentInput | undefined
}

export interface AddNatureInput {
  natureId: string
  quantity: number
}
