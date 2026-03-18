export interface InvoiceData {
  invoiceNumber:  string
  createdAt:      Date
  client: {
    firstName: string
    lastName:  string
    mobile:    string
  }
  package: {
    reference: string
    weight:    number
  }
  natures: {
    name:      string
    quantity:  number
    unitPrice: number
    total:     number
  }[]
  remise:         number
  remiseReason:   string | null
  amount:         number
  currency: {
    code:   string
    symbol: string
  }
  amountXof:      number
  exchangeRate:   number
  paymentMethod:  string
  priceRelay:     number | null
  insurancePrice: number
}

export interface QuoteData {
  generatedAt: Date
  client: {
    firstName: string
    lastName:  string
    mobile:    string
  }
  package: {
    reference: string
    weight:    number
  }
  natures: {
    name:      string
    quantity:  number
    unitPrice: number
    total:     number
  }[]
  departureGp: {
    departureDate:      Date
    departureAddress:   string
    destinationAddress: string
  }
  totalEstime: number
  currency: {
    code:   string
    symbol: string
  }
}
