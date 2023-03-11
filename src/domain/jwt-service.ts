import jwt from 'jsonwebtoken';
import {UserDbType} from "../repositories/types/user-db-type";
import {settings} from "../settings";

export const jwtService = {

    async createJWT(user:UserDbType){

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