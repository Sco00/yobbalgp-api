import { z } from 'zod'

export const CreatePersonSchema = z.object({
  firstName:    z.string({ error: "Le prénom est obligatoire" }),
  lastName:     z.string({ error: "Le nom est obligatoire" }),
  mobile:       z.string(),
  personTypeId: z.string({ error: "Le type de personne est obligatoire" })
                  .uuid("Identifiant type de personne invalide"),
})

export const UpdatePersonSchema = CreatePersonSchema.partial()

export const PersonFiltersSchema = z.object({
  search:       z.string().optional(),
  personTypeId: z.uuid().optional(),
  page:         z.coerce.number().int().positive().default(1),
  limit:        z.coerce.number().int().positive().max(100).default(20),
})

export type CreatePersonDTO    = z.infer<typeof CreatePersonSchema>
export type UpdatePersonDTO    = z.infer<typeof UpdatePersonSchema>
export type PersonFiltersDTO   = z.infer<typeof PersonFiltersSchema>