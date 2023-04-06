import {usersAccountsCollection} from "../db/db";
import {UserViewType} from "./types/user-view-type";

import {ObjectId} from "mongodb";
import {UserByIdType} from "./types/user-by-id-type";
import {UserAccountDbType} from "./types/user-account-db-type";

export const userRepository = {
    async createNewUser(newUser: UserAccountDbType): Promise<UserViewType> {

        await usersAccountsCollection.insertOne(newUser)
        return {

            id: newUser._id.toString(),
            login: newUser.accountData.login,
            email: newUser.accountData.email,
            createdAt: newUser.accountData.createdAt
        }

    },

    async deleteUser(id: string): Promise<boolean> {
        try {
            const result = await usersAccountsCollection.deleteOne({_id: new ObjectId(id)});
            return result.deletedCount === 1;
        }
        catch (e) {
            return false
        }

    },

    async checkCredentials(loginOrEmail: string): Promise<UserAccountDbType | null> {
        return await usersAccountsCollection.findOne({$or: [{login: loginOrEmail}, {email: loginOrEmail}]})
    },

    async findUserById (userId:string):Promise<UserByIdType | null>{
        const result =await usersAccountsCollection.findOne({_id:new ObjectId(userId)})
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