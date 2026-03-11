import { z } from 'zod'
import { CreatePersonSchema } from './person.validator.js'
import { ErrorsMessages } from '../../../shared/messages/ErrorsMessagesFr.js'

export const LoginSchema = z.object({
  email:    z.string({ error: ErrorsMessages.EMAIL_OBLIGATOIRE })
              .email("Format email invalide"),
  password: z.string({ error: ErrorsMessages.MOT_DE_PASSE_OBLIGATOIRE })
              .min(8, ErrorsMessages.MOT_DE_PASSE_TROP_COURT),
})

export const CreateAccountSchema = z.object({
  email:    z.string({ error: ErrorsMessages.EMAIL_OBLIGATOIRE })
              .email("Format email invalide"),
  password: z.string({ error: ErrorsMessages.MOT_DE_PASSE_OBLIGATOIRE })
              .min(8, ErrorsMessages.MOT_DE_PASSE_TROP_COURT),
  roleId:   z.string({ error: "Le rôle est obligatoire" })
              .uuid("Identifiant rôle invalide"),

  // Soit personId existant, soit infos pour créer la personne
  personId: z.string().uuid().optional(),
}).and(CreatePersonSchema.partial())
  .refine(
    data => data.personId || (data.firstName && data.lastName && data.personTypeId),
    { message: "Fournir soit un personId existant, soit les informations de la personne" }
  )

export type LoginDTO         = z.infer<typeof LoginSchema>
export type CreateAccountDTO = z.infer<typeof CreateAccountSchema>