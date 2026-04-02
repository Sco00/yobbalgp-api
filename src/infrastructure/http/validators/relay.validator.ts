import { z }               from 'zod'
import { ErrorsMessages }  from '../../../shared/messages/ErrorsMessagesFr.js'

export const CreateRelaySchema = z.object({
  name:      z.string({ error: ErrorsMessages.RELAIS_NOM_OBLIGATOIRE }),
  personId:  z.string({ error: ErrorsMessages.RELAIS_PERSONNE_OBLIGATOIRE }).uuid(),
  addressId: z.string({ error: ErrorsMessages.RELAIS_ADRESSE_OBLIGATOIRE }).uuid(),
})

export const UpdateRelaySchema = CreateRelaySchema.partial()

export const RelayFiltersSchema = z.object({
  search:  z.string().optional(),
  country: z.string().optional(),
  region:  z.string().optional(),
  city:    z.string().optional(),
  page:    z.coerce.number().int().positive().default(1),
  limit:   z.coerce.number().int().positive().max(100).default(10),
})

export type CreateRelayDTO  = z.infer<typeof CreateRelaySchema>
export type UpdateRelayDTO  = z.infer<typeof UpdateRelaySchema>
export type RelayFiltersDTO = z.infer<typeof RelayFiltersSchema>