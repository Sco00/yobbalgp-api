import { AccountWithRelations, CreateAccountProps } from "../../domain/entities/Account/account.types.js";
import { IAccountRepository } from "../../domain/repositories/IAccountRepository.js";
export declare class CreateAccountUseCase {
    private readonly accountRepo;
    constructor(accountRepo: IAccountRepository);
    execute(props: CreateAccountProps): Promise<AccountWithRelations>;
}
//# sourceMappingURL=CreateAccountUseCase.d.ts.map