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
  roleId:   z.string({ error: ErrorsMessages.ROLE_OBLIGATOIRE })
              .uuid(ErrorsMessages.ROLE_ID_INVALIDE),

  // Soit personId existant, soit infos pour créer la personne
  personId: z.string().uuid().optional(),
}).and(CreatePersonSchema.partial())
  .refine(
    data => data.personId || (data.firstName && data.lastName && data.personTypeId),
    { message: "Fournir soit un personId existant, soit les informations de la personne" }
  )

export const RefreshTokenSchema = z.object({
  refreshToken: z.string({ error: 'Le refresh token est obligatoire' }),
})

export type LoginDTO          = z.infer<typeof LoginSchema>
export type CreateAccountDTO  = z.infer<typeof CreateAccountSchema>
export type RefreshTokenDTO   = z.infer<typeof RefreshTokenSchema>