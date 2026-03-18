import { Prisma } from "@prisma/client";
import { CreatePaymentDTO } from "../../../infrastructure/http/validators/payment.validator.js";

type SystemFields = {
  creatorId: string;
  amountXof: number;
  exchangeRate: number;
};

export type PaymentWithRelations = Prisma.PaymentGetPayload<{
  include: {
    currency:      true
    paymentMethod: true
    package: {
      include: {
        person:  true
        natures: { include: { nature: true } }
      }
    }
  }
}>

export type CreatePaymentProps = CreatePaymentDTO & SystemFields;
