import { Prisma } from "@prisma/client";
import { type CreatePaymentInput } from "../../../application/dtos/payment.dtos.js";

type SystemFields = {
  amountXof:    number;
  exchangeRate: number;
};

export const paymentInclude = {
  currency:      true,
  paymentMethod: true,
  package: {
    include: {
      person:  true,
      natures: { include: { nature: true } },
    },
  },
} as const

export const paymentListInclude = {
  currency:      true,
  paymentMethod: true,
  package: {
    include: {
      person: true,
    },
  },
} as const

export type PaymentWithRelations = Prisma.PaymentGetPayload<{ include: typeof paymentInclude }>
export type PaymentListItem      = Prisma.PaymentGetPayload<{ include: typeof paymentListInclude }>

export type CreatePaymentProps = CreatePaymentInput & SystemFields;
