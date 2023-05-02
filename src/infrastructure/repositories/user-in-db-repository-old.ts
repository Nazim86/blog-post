import {UserViewType} from "./types/user-view-type";

import {ObjectId} from "mongodb";
import {UserByIdType} from "./types/user-by-id-type";
import {UserAccount} from "./types/user-account";
import {UserModel} from "../../domain/UsersEntity";

export const userRepositoryOld = {
    async createNewUser(newUser: UserAccount): Promise<UserViewType> {

        await UserModel.create(newUser)
        return {
            id: newUser._id.toString(),
            login: newUser.accountData.login,
            email: newUser.accountData.email,
            createdAt: newUser.accountData.createdAt
        }
    },

    async deleteUser(id: string): Promise<boolean> {
        try {
            const result = await UserModel.deleteOne({_id: new ObjectId(id)});
            return result.deletedCount === 1;
        }
        catch (e) {
            return false
        }

    },

    async findUserByLoginOrEmail(loginOrEmail: string): Promise<UserAccount | null> {
        return await UserModel.findOne({$or: [{login: loginOrEmail}, {email: loginOrEmail}]})
    },

    async findUserById (userId:string):Promise<UserByIdType | null>{
        const result =await UserModel.findOne({_id:new ObjectId(userId)})
        if (result) {
            return {
                email:result.accountData.email,
                login: result.accountData.login,
                userId: result._id.toString()
            }
        }else{
            return null
        }
    }
}