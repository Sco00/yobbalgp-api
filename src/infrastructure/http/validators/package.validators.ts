import { z } from 'zod'
import { PackageStates } from '../../../domain/enums/PackageStates.js'

export const PackageNatureSchema = z.object({
  natureId: z.string().uuid(),
  quantity: z.number().positive(),
})

const PaymentInputSchema = z.object({
  amount:          z.number().positive(),
  currencyId:      z.string().uuid(),
  paymentMethodId: z.string().uuid(),
  remise:          z.number().nonnegative().optional(),
  remiseReason:    z.string().optional(),
  insurancePrice:  z.number().nonnegative().optional(),
})

export const CreatePackageSchema = z.object({
  weight:        z.number({ error: "Le poids est obligatoire" })
                  .positive("Le poids doit être supérieur à 0"),
  departureGpId: z.string({ error: "Le départ GP est obligatoire" })
                  .uuid("L'identifiant du départ GP est invalide"),
  personId:      z.string({ error: "Le client est obligatoire" })
                  .uuid("L'identifiant du client est invalide"),
  relayId:       z.string().uuid("L'identifiant du relais est invalide")
                  .nullable().optional(),
  packageNatures: z.array(PackageNatureSchema, { error: "Les natures sont obligatoires" })
                  .min(1, "Un colis doit avoir au moins une nature"),
  payment:        PaymentInputSchema.optional(),
})

export const UpdatePackageStatusSchema = z.object({
  state: z.nativeEnum(PackageStates),
})

export const PackageFiltersSchema = z.object({
  search:             z.string().optional(),
  state:              z.nativeEnum(PackageStates).optional(),
  createdAtFrom:      z.coerce.date().optional(),
  departureCountry:   z.coerce.string().optional(),
  destinationCountry: z.coerce.string().optional(),
  currencyId:         z.coerce.string().optional(),
  page:               z.coerce.number().int().positive().default(1),
  limit:              z.coerce.number().int().positive().max(100).default(10),
})

export type CreatePackageDTO      = z.infer<typeof CreatePackageSchema>
export type UpdatePackageStatusDTO = z.infer<typeof UpdatePackageStatusSchema>
export type PackageFiltersDTO     = z.infer<typeof PackageFiltersSchema>
export type PackageNaturesDTO     = z.infer<typeof PackageNatureSchema>