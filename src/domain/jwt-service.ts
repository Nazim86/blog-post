import jwt from 'jsonwebtoken';
import {ObjectId} from "mongodb";
import {settings} from "../settings";
import {randomUUID} from "crypto";

export const jwtService = {

    async createJWT(userId: ObjectId, secretKey: string, expirationTime: string){

        return jwt.sign({userId: userId, deviceId:randomUUID()}, secretKey, {expiresIn: expirationTime})

    },


    // async getUserIdAndIssuedDateByToken (refreshToken:string, secretKey:string):Promise<string|null>{
    //
    //     try {
    //         const decoded:any = jwt.verify(refreshToken,secretKey)
    //         return decoded.userId
    //     }
    //     catch (e){
    //         return null
    //     }
    // },

    async getRefreshTokenMetaData(refreshToken: string, secretKey: string = settings.REFRESH_TOKEN_SECRET):Promise<any>{ //TODO change any

        try {
            const decoded:any = jwt.verify(refreshToken,secretKey)
            return {deviceId:decoded.deviceId,lastActiveDate:new Date(decoded.iat), userId:decoded.userId,expiration:decoded.exp}
        }
        catch (e){
            return null
        }

    }
}

