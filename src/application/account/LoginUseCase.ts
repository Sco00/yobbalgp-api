import { type IAccountRepository } from '../../domain/repositories/IAccountRepository.js'
import { type LoginInput }         from '../dtos/account.dtos.js'
import { JWTService }              from '../../shared/services/JWTService.js'
import { ENV }                     from '../../shared/config/env.js'
import { UnauthorizedError }       from '../../shared/errors/UnauthorizedError.js'
import { ErrorsMessages }          from '../../shared/messages/ErrorsMessagesFr.js'
import bcrypt                      from 'bcryptjs'

interface LoginResult {
  accessToken:  string
  refreshToken: string
  user: {
    id:     string
    email:  string
    role:   string
    person: { firstName: string; lastName: string }
  }
}

export class LoginUseCase {
  constructor(private readonly accountRepo: IAccountRepository) {}

  async execute(dto: LoginInput): Promise<LoginResult> {
    const account = await this.accountRepo.findByEmail(dto.email)
    if (!account) {
      throw new UnauthorizedError(ErrorsMessages.IDENTIFIANTS_INCORRECTS)
    }

    const isValid = await bcrypt.compare(dto.password, account.password)
    if (!isValid) {
      throw new UnauthorizedError(ErrorsMessages.IDENTIFIANTS_INCORRECTS)
    }

    const accessToken = JWTService.cryptData(
      { id: account.id, email: account.email, role: account.role.name },
      ENV.JWT_SECRET,
      1,
    )

    const refreshToken = JWTService.cryptData(
      { email: account.email },
      ENV.JWT_SECRET,
    )

    return {
      accessToken,
      refreshToken,
      user: {
        id:     account.id,
        email:  account.email,
        role:   account.role.name,
        person: { firstName: account.person.firstName, lastName: account.person.lastName },
      },
    }
  }
}
