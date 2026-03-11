import bcrypt from "bcryptjs"
import { AccountWithRelations, CreateAccountProps } from "../../domain/entities/Account/account.types.js"
import { IAccountRepository } from "../../domain/repositories/IAccountRepository.js"
import { ConflictError } from "../../shared/errors/ConflictError.js"
import { ErrorsMessages } from "../../shared/messages/ErrorsMessagesFr.js"

export class CreateAccountUseCase {
  constructor(private readonly accountRepo: IAccountRepository) {}

  async execute(props: CreateAccountProps): Promise<AccountWithRelations> {
    const existing = await this.accountRepo.findByEmail(props.email)
    if (existing) throw new ConflictError(ErrorsMessages.ACCOUNT_DEJA_EXISTANT)

    const hashedPassword = await bcrypt.hash(props.password, 12)

    return await this.accountRepo.save({
      ...props,
      password: hashedPassword,
    })
  }
}