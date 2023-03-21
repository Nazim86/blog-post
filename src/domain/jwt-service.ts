import jwt from 'jsonwebtoken';
import {settings} from "../settings";
import {UserAccountDbType} from "../repositories/types/user-account-db-type";

export const jwtService = {

    async createJWT(user:UserAccountDbType){

        return jwt.sign({userId: user._id}, settings.JWT_SECRET, {expiresIn: "7d"})

    },

    //TODO need to finish this
    async getUserIdByToken (token:string){

        try {
            const decoded:any = jwt.verify(token,settings.JWT_SECRET)
            return decoded.userId
        }
        catch (e){
            return null
        }
    }
}