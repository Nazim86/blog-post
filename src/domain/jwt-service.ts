import jwt from 'jsonwebtoken';
import {UserViewType} from "../types/user-view-type";
import {UserDbType} from "../types/user-db-type";
import {settings} from "../../settings";

export const jwtService = {

    async createJWT(user:UserDbType){

        const token = jwt.sign({userId:user._id},settings.JWT_SECRET,{expiresIn:"1h"})
        return token

    },

    //TODO need to finish this
    async getUserIdByToken (token:string){

        try {
            const decoded = jwt.verify(token,settings.JWT_SECRET)

            return decoded.userId
        }
        catch (e){
            return null
        }



    }
}