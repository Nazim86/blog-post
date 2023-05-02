import {UserViewType} from "../infrastructure/repositories/types/user-view-type";
import {UserAccount} from "../infrastructure/repositories/types/user-account";

export const userMapping = (newUser:UserAccount[]):UserViewType[]=>{
    return newUser.map((user:UserAccount):UserViewType=>{

        return{
            id:user._id.toString(),
            login:user.accountData.login,
            email:user.accountData.email,
            createdAt: user.accountData.createdAt
        }

    })
}