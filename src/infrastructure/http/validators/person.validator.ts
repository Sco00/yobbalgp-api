import { z } from 'zod'

export const CreatePersonSchema = z.object({
  firstName:    z.string({ error: "Le prénom est obligatoire" }),
  lastName:     z.string({ error: "Le nom est obligatoire" }),
  mobile:       z.string().optional().nullable(),
  personTypeId: z.string({ error: "Le type de personne est obligatoire" })
                  .uuid("Identifiant type de personne invalide"),
})

export const UpdatePersonSchema = CreatePersonSchema.partial()

export type CreatePersonDTO = z.infer<typeof CreatePersonSchema>
export type UpdatePersonDTO = z.infer<typeof UpdatePersonSchema>