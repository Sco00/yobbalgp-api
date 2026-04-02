import { type IAccountRepository } from '../../domain/repositories/IAccountRepository.js'
import { type RefreshTokenInput }  from '../dtos/account.dtos.js'
import { JWTService }              from '../../shared/services/JWTService.js'
import { ENV }                     from '../../shared/config/env.js'
import { UnauthorizedError }       from '../../shared/errors/UnauthorizedError.js'
import { ErrorsMessages }          from '../../shared/messages/ErrorsMessagesFr.js'

interface RefreshTokenResult {
  accessToken: string
}

export class RefreshTokenUseCase {
  constructor(private readonly accountRepo: IAccountRepository) {}

  async execute(dto: RefreshTokenInput): Promise<RefreshTokenResult> {
    const decoded = JWTService.verifyRefreshToken(dto.refreshToken, ENV.JWT_SECRET)

    const account = await this.accountRepo.findByEmail(decoded.email)
    if (!account) {
      throw new UnauthorizedError(ErrorsMessages.ACCOUNT_INTROUVABLE)
    }

    const accessToken = JWTService.cryptData(
      { id: account.id, email: account.email, role: account.role.name },
      ENV.JWT_SECRET,
      1,
    )

    return { accessToken }
  }
}
