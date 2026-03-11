import jwt from 'jsonwebtoken';
import { JwtAccessPayload } from '../types/JwtPayload.js';
import { JwtRefreshPayload } from '../types/JwtPayload.js';
export declare class JWTService {
    static cryptData(payload: JwtAccessPayload | JwtRefreshPayload, secretKey: string, validityTime?: number): string;
    static decryptToken(token: string, secretKey: string): string | jwt.JwtPayload;
}
//# sourceMappingURL=JWTService.d.ts.map