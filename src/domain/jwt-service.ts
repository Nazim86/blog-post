import jwt from 'jsonwebtoken';
import {ObjectId} from "mongodb";

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
    }
}

