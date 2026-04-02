import { Prisma } from "@prisma/client";
import { type CreateAccountInput } from "../../../application/dtos/account.dtos.js";

export type AccountWithRelations = Prisma.AccountGetPayload<{
  include: {
    role:   true;
    person: true;
  };
}>;

export type CreateAccountProps = CreateAccountInput
