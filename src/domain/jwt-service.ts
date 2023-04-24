import jwt from 'jsonwebtoken';
import {ObjectId} from "mongodb";
import {settings} from "../settings";
import {randomUUID} from "crypto";


export class JwtService {

    async createJWT(userId: ObjectId, secretKey: string, expirationTime: string, deviceId: string | null = null) {
        let newDeviceId = randomUUID()
        if (deviceId !== null) {
            newDeviceId = deviceId
        }

        return jwt.sign({userId: userId, deviceId: newDeviceId}, secretKey, {expiresIn: expirationTime})

    }

    async getTokenMetaData(refreshToken: string, secretKey: string = settings.REFRESH_TOKEN_SECRET): Promise<any> {
        try {
            const decoded: any = jwt.verify(refreshToken, secretKey)
            return {
                deviceId: decoded.deviceId,
                lastActiveDate: new Date(decoded.iat * 1000).toISOString(),
                userId: decoded.userId,
                expiration: decoded.exp
            }
        } catch (e) {
            return null
        }

    }
}

