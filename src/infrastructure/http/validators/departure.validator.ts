import { z } from 'zod'
import { DepartureStates } from '../../../domain/enums/DepartureStates.js'

export const CreateDepartureSchema = z.object({
  departureDate:        z.coerce.date({ error: 'Date de départ invalide ou manquante' }),
  arrivalDate:          z.coerce.date({ error: "Date d'arrivée invalide ou manquante" }),
  deadline:             z.coerce.date({ error: 'Deadline invalide ou manquante' }),
  price:                z.coerce.number({ error: 'Prix client invalide' }).positive('Le prix client doit être positif'),
  priceGp:              z.coerce.number({ error: 'Prix GP invalide' }).nonnegative('Le prix GP doit être positif ou nul'),
  currencyId:           z.string({ error: 'Devise manquante' }).uuid({ error: 'Devise invalide' }),
  departureAddressId:   z.string({ error: 'Ville de départ manquante' }).uuid({ error: 'Adresse de départ invalide' }),
  destinationAddressId: z.string({ error: 'Ville de destination manquante' }).uuid({ error: 'Adresse de destination invalide' }),
  personId:             z.string().uuid({ error: 'Partenaire invalide' }).optional(),
  insurancePrice:       z.coerce.number().nonnegative("Le prix d'assurance doit être positif ou nul").optional(),
})

export const DepartureFiltersSchema = z.object({
  departureCountry:   z.string().optional(),
  destinationCountry: z.string().optional(),
  currencyId:         z.string().uuid().optional(),
  isClosed:           z.coerce.boolean().optional(),
  departureDateFrom:  z.coerce.date().optional(),
  search:             z.string().optional(),
  page:               z.coerce.number().int().positive().default(1),
  limit:              z.coerce.number().int().positive().max(500).default(10),
})

export const UpdateDepartureStateSchema = z.object({
  state: z.nativeEnum(DepartureStates),
})

export type CreateDepartureDTO      = z.infer<typeof CreateDepartureSchema>
export type DepartureFiltersDTO     = z.infer<typeof DepartureFiltersSchema>
export type UpdateDepartureStateDTO = z.infer<typeof UpdateDepartureStateSchema>
