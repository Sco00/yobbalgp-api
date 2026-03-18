import { z } from "zod";

export const CreatePaymentSchema = z.object({
  amount: z.number().positive(),
  currencyId: z.string().uuid(),
  paymentMethodId: z.string().uuid(),
  linkInvoice: z.string().optional(),
  packageId: z.string().uuid(),
  remise: z.number().nonnegative().optional(),
  remiseReason: z.string().optional(),
  priceRelay: z.number().nonnegative().optional(),
  insurancePrice: z.number().nonnegative().optional(),
});

export const PaymentFiltersSchema = z.object({
  packageId:  z.string().uuid().optional(),
  accepted:   z.coerce.boolean().optional(),
  refunded:   z.coerce.boolean().optional(),
  currencyId: z.string().uuid().optional(),
  page:       z.coerce.number().int().positive().default(1),
  limit:      z.coerce.number().int().positive().max(100).default(20),
})

export const UpdatePaymentSchema = CreatePaymentSchema.partial();

export type CreatePaymentDTO = z.infer<typeof CreatePaymentSchema>
export type UpdatePaymentDTO = z.infer<typeof UpdatePaymentSchema>
export type PaymentFiltersDTO = z.infer<typeof PaymentFiltersSchema>
