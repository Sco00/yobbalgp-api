import { type IAccountRepository } from '../../domain/repositories/IAccountRepository.js'
import { type RefreshTokenDTO } from '../../infrastructure/http/validators/account.validator.js'
import { JWTService } from '../../shared/services/JWTService.js'
import { SECRET_KEY } from '../../infrastructure/config/env.js'
import { UnauthorizedError } from '../../shared/errors/UnauthorizedError.js'
import { ErrorsMessages } from '../../shared/messages/ErrorsMessagesFr.js'
import { JwtRefreshPayload } from '../../shared/types/JwtPayload.js'

interface RefreshTokenResult {
  accessToken: string
}

export class RefreshTokenUseCase {
  constructor(private readonly accountRepo: IAccountRepository) {}

  async execute(dto: RefreshTokenDTO): Promise<RefreshTokenResult> {
    let decoded: JwtRefreshPayload

    try {
      decoded = JWTService.decryptToken(dto.refreshToken, SECRET_KEY) as JwtRefreshPayload
    } catch {
      throw new UnauthorizedError(ErrorsMessages.TOKEN_INVALIDE)
    }

    if (!decoded?.email) {
      throw new UnauthorizedError(ErrorsMessages.TOKEN_INVALIDE)
    }

    const account = await this.accountRepo.findByEmail(decoded.email)
    if (!account) {
      throw new UnauthorizedError(ErrorsMessages.ACCOUNT_INTROUVABLE)
    }

    const accessToken = JWTService.cryptData(
      {
        id:    account.id,
        email: account.email,
        role:  account.role.name,
      },
      SECRET_KEY,
      1,
    )

    return { accessToken }
  }
}
