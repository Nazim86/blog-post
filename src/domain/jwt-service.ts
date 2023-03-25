import jwt from 'jsonwebtoken';
import {UserAccountDbType} from "../repositories/types/user-account-db-type";

export const jwtService = {

    async createJWT(user:UserAccountDbType, secretKey:string,expirationTime:string){

        return jwt.sign({userId: user._id}, secretKey, {expiresIn: expirationTime})

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

