import jwt from 'jsonwebtoken';
import { ErrorsMessages } from '../messages/ErrorsMessagesFr.js';
// import { UserService } from './UserService.js';
export class JWTService {
    static cryptData(payload, secretKey, validityTime) {
        const option = {};
        if (!secretKey)
            throw new Error(ErrorsMessages.SECRET_KEY_MANQUANTE);
        if (validityTime)
            option.expiresIn = `${validityTime}h`;
        return jwt.sign(payload, secretKey, option);
    }
    static decryptToken(token, secretKey) {
        if (!secretKey)
            throw new Error(ErrorsMessages.SECRET_KEY_MANQUANTE);
        return jwt.verify(token, secretKey);
    }
}
//# sourceMappingURL=JWTService.js.map