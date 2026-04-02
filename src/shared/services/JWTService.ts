import jwt                    from 'jsonwebtoken'
import { type JwtAccessPayload, type JwtRefreshPayload } from '../types/JwtPayload.js'
import { UnauthorizedError }  from '../errors/UnauthorizedError.js'
import { ErrorsMessages }     from '../messages/ErrorsMessagesFr.js'

export class JWTService {
  static cryptData(payload: JwtAccessPayload | JwtRefreshPayload, secretKey: string, validityTime?: number): string {
    const option: jwt.SignOptions = {}
    if (!secretKey) throw new Error(ErrorsMessages.SECRET_KEY_MANQUANTE)
    if (validityTime) option.expiresIn = `${validityTime}h`
    return jwt.sign(payload, secretKey, option)
  }

  static decryptToken(token: string, secretKey: string): string | jwt.JwtPayload {
    if (!secretKey) throw new Error(ErrorsMessages.SECRET_KEY_MANQUANTE)
    return jwt.verify(token, secretKey)
  }

  static verifyRefreshToken(token: string, secret: string): JwtRefreshPayload {
    let decoded: string | jwt.JwtPayload
    try {
      decoded = jwt.verify(token, secret)
    } catch {
      throw new UnauthorizedError(ErrorsMessages.TOKEN_INVALIDE)
    }
    if (typeof decoded !== 'object' || decoded === null || !('email' in decoded)) {
      throw new UnauthorizedError(ErrorsMessages.TOKEN_INVALIDE)
    }
    return decoded as JwtRefreshPayload
  }
}
