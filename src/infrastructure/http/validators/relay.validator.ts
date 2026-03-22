import { z } from 'zod'

export const CreateRelaySchema = z.object({
  name:      z.string({ error: 'Le nom du relais est obligatoire' }),
  personId:  z.string({ error: 'La personne est obligatoire' }).uuid(),
  addressId: z.string({ error: 'L\'adresse est obligatoire' }).uuid(),
})

export const UpdateRelaySchema = CreateRelaySchema.partial()

export const RelayFiltersSchema = z.object({
  search:  z.string().optional(),
  country: z.string().optional(),
  region:  z.string().optional(),
  city:    z.string().optional(),
  page:    z.coerce.number().int().positive().default(1),
  limit:   z.coerce.number().int().positive().max(100).default(20),
})

export type CreateRelayDTO  = z.infer<typeof CreateRelaySchema>
export type UpdateRelayDTO  = z.infer<typeof UpdateRelaySchema>
export type RelayFiltersDTO = z.infer<typeof RelayFiltersSchema>