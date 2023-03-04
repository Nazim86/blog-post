import {UserDbType} from "../types/user-db-type";
import {UserViewType} from "../types/user-view-type";

export const userMapping = (newUser:UserDbType[]):UserViewType[]=>{
    return newUser.map((user:UserDbType):UserViewType=>{

        return{
            id:user._id.toString(),
            login:user.login,
            email:user.email,
            createdAt: user.createdAt
        }

    })
}