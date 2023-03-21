import {UserViewType} from "../repositories/types/user-view-type";
import {UserAccountDbType} from "../repositories/types/user-account-db-type";

export const userMapping = (newUser:UserAccountDbType[]):UserViewType[]=>{
    return newUser.map((user:UserAccountDbType):UserViewType=>{

        return{
            id:user._id.toString(),
            login:user.accountData.login,
            email:user.accountData.email,
            createdAt: user.accountData.createdAt
        }

    })
}