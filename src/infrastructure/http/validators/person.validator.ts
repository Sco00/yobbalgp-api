import { z } from 'zod'
import { validatePhoneNumber } from '../../../shared/utils/phone.utils.js'

export const CreatePersonSchema = z.object({
  firstName:    z.string({ error: "Le prénom est obligatoire" }),
  lastName:     z.string({ error: "Le nom est obligatoire" }),
  mobile:       z.string({ error: "Le numéro de téléphone est obligatoire" })
                  .refine(
                    (val) => validatePhoneNumber(val),
                    { message: "Le numéro de téléphone est invalide. Utilisez le format international (ex: +221771234567)" }
                  ),
  personTypeId: z.string({ error: "Le type de personne est obligatoire" })
                  .uuid("Identifiant type de personne invalide"),
})

export const UpdatePersonSchema = CreatePersonSchema.partial()

export const PersonFiltersSchema = z.object({
  search:       z.string().optional(),
  personTypeId: z.uuid().optional(),
  hasPackages:  z.coerce.boolean().optional(),
  page:         z.coerce.number().int().positive().default(1),
  limit:        z.coerce.number().int().positive().max(100).default(10),
})

export type CreatePersonDTO    = z.infer<typeof CreatePersonSchema>
export type UpdatePersonDTO    = z.infer<typeof UpdatePersonSchema>
export type PersonFiltersDTO   = z.infer<typeof PersonFiltersSchema>