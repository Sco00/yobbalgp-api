export interface CreatePaymentInput {
  amount:          number
  currencyId:      string
  paymentMethodId: string
  linkInvoice?:    string | undefined
  packageId:       string
  remise?:         number | undefined
  remiseReason?:   string | undefined
  priceRelay?:     number | undefined
  insurancePrice?: number | undefined
  creatorId:       string
}
