import { Prisma } from "@prisma/client";
import { CreateAccountDTO } from "../../../infrastructure/http/validators/account.validator.js";
export type AccountWithRelations = Prisma.AccountGetPayload<{
  include: {
    role: true;
    person: true;
  };
}>;

export type CreateAccountProps = CreateAccountDTO & {personId: string}
