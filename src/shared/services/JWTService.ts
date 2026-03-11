import jwt from 'jsonwebtoken'
import { SECRET_KEY } from '../../infrastructure/config/env.js'; 
import { Response } from 'express';
import { JwtAccessPayload } from '../types/JwtPayload.js';
import { JwtRefreshPayload } from '../types/JwtPayload.js';
import { ErrorsMessages } from '../messages/ErrorsMessagesFr.js';
// import { UserService } from './UserService.js';

export class JWTService
{
    static cryptData(payload: JwtAccessPayload | JwtRefreshPayload, secretKey: string, validityTime?: number) {
        const option: jwt.SignOptions = {}
        if (!secretKey) throw new Error(ErrorsMessages.SECRET_KEY_MANQUANTE)
        if (validityTime) option.expiresIn = `${validityTime}h`;
        return jwt.sign(payload, secretKey, option);
    }

    static decryptToken(token: string, secretKey: string,){
        if (!secretKey) throw new Error(ErrorsMessages.SECRET_KEY_MANQUANTE)
        return jwt.verify(token, secretKey);
    }

    // static async refreshToken(token: string, secretKey: string){
    //     const decoded = this.decryptToken(token, secretKey);
    //     if(decoded){
    //         const payload = decoded as { login: string };
    //         const user = await UserService.selectUserByLogin(payload.login);
    //         if(!user) return null;
    //         return  this.cryptData({login: user.login, id: user.id}, OMSecret_Key, 1);
    //     }
    //     return null;
    // }
}