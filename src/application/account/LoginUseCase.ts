import { type IAccountRepository } from '../../domain/repositories/IAccountRepository.js'
import { type LoginDTO } from '../../infrastructure/http/validators/account.validator.js'
import { JWTService } from '../../shared/services/JWTService.js'
import { SECRET_KEY } from '../../infrastructure/config/env.js'
import { UnauthorizedError } from '../../shared/errors/UnauthorizedError.js'
import { ErrorsMessages } from '../../shared/messages/ErrorsMessagesFr.js'
import bcrypt from 'bcryptjs'

interface LoginResult {
  accessToken: string
  refreshToken: string
  user: {
    id:        string
    email:     string
    role:      string
    personId:  string
  }
}

export class LoginUseCase {
  constructor(private readonly accountRepo: IAccountRepository) {}

  async execute(dto: LoginDTO): Promise<LoginResult> {
    const account = await this.accountRepo.findByEmail(dto.email)
    if (!account) {
      throw new UnauthorizedError(ErrorsMessages.IDENTIFIANTS_INCORRECTS)
    }

    const isValid = await bcrypt.compare(dto.password, account.password)
    if (!isValid) {
      throw new UnauthorizedError(ErrorsMessages.IDENTIFIANTS_INCORRECTS)
    }

    const accessToken = JWTService.cryptData({
      id:    account.id,
      email: account.email,
      role:  account.role.name,
    },
    SECRET_KEY,
    1
    )

    const refreshToken = JWTService.cryptData({
      email: account.email,
    },
    SECRET_KEY
    )

    return {
      accessToken,
      refreshToken,
      user: {
        id:       account.id,
        email:    account.email,
        role:     account.role.name,
        personId: account.personId,
      }
    }
  }
}