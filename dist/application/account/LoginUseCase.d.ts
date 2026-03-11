import { type IAccountRepository } from '../../domain/repositories/IAccountRepository.js';
import { type LoginDTO } from '../../infrastructure/http/validators/account.validator.js';
interface LoginResult {
    accessToken: string;
    refreshToken: string;
    user: {
        id: string;
        email: string;
        role: string;
        personId: string;
    };
}
export declare class LoginUseCase {
    private readonly accountRepo;
    constructor(accountRepo: IAccountRepository);
    execute(dto: LoginDTO): Promise<LoginResult>;
}
export {};
//# sourceMappingURL=LoginUseCase.d.ts.map