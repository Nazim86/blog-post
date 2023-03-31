import jwt from 'jsonwebtoken';
import {ObjectId} from "mongodb";
import {settings} from "../settings";

export const jwtService = {

    async createJWT(id:ObjectId, secretKey:string,expirationTime:string){

        return jwt.sign({userId: id}, secretKey, {expiresIn: expirationTime})

    },


    async getUserIdByToken (token:string,secretKey:string):Promise<string|null>{

        try {
            const decoded:any = jwt.verify(token,secretKey)
            return decoded.userId
        }
        catch (e){
            return null
        }
    },

    async getRefreshTokenIssuedDate(refreshToken:string):Promise<number>{
        const decoded:any = jwt.verify(refreshToken,settings.REFRESH_TOKEN_SECRET)
        return decoded.iat
    }
}

