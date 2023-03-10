import jwt, {JwtPayload} from 'jsonwebtoken';
import {UserViewType} from "../repositories/types/user-view-type";
import {UserDbType} from "../repositories/types/user-db-type";
import {settings} from "../settings";
import {ObjectId} from "mongodb";

export const jwtService = {

    async createJWT(user:UserDbType){

        const token = jwt.sign({userId:user._id},settings.JWT_SECRET,{expiresIn:"1h"})
        return token

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