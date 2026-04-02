import { AddressType } from '../../domain/enums/AddressType.js'

export interface CreateAddressInput {
  country:    string
  region:     string
  city:       string
  locality?:  string | undefined
  type:       AddressType
  latitude?:  number | undefined
  longitude?: number | undefined
}
