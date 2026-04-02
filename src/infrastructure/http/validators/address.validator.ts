import { z }           from 'zod'
import { AddressType } from '../../../domain/enums/AddressType.js'

export const CreateAddressSchema = z.object({
  country:   z.string({ error: 'Le pays est obligatoire' }).min(1),
  region:    z.string({ error: 'La région est obligatoire' }).min(1),
  city:      z.string({ error: 'La ville est obligatoire' }).min(1),
  locality:  z.string().optional(),
  type:      z.nativeEnum(AddressType),
  latitude:  z.number().optional(),
  longitude: z.number().optional(),
})

export const AddressFiltersSchema = z.object({
  search:  z.string().optional(),
  country: z.string().optional(),
  region:  z.string().optional(),
  city:    z.string().optional(),
  type:    z.nativeEnum(AddressType).optional(),
  page:    z.coerce.number().int().positive().default(1),
  limit:   z.coerce.number().int().positive().max(100).default(10),
})

export type CreateAddressDTO  = z.infer<typeof CreateAddressSchema>
export type AddressFiltersDTO = z.infer<typeof AddressFiltersSchema>
