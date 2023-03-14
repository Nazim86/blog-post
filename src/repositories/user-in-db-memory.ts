import {usersCollection} from "../db/db";
import {UserDbType} from "./types/user-db-type";
import {UserViewType} from "./types/user-view-type";

import {ObjectId} from "mongodb";
import {UserByIdType} from "./types/user-by-id-type";

export const userRepository = {
    async createNewUser(newUser: UserDbType): Promise<UserViewType> {

        await usersCollection.insertOne(newUser)
        return {

            id: newUser._id.toString(),
            login: newUser.login,
            email: newUser.email,
            createdAt: newUser.createdAt
        }

    },

    async deleteUser(id: string): Promise<boolean> {
        try {
            const result = await usersCollection.deleteOne({_id: new ObjectId(id)});
            return result.deletedCount === 1;
        }
        catch (e) {
            return false
        }

    },

    async checkCredentials(loginOrEmail: string): Promise<UserDbType | null> {
        return await usersCollection.findOne({$or: [{login: loginOrEmail}, {email: loginOrEmail}]})
    },

    async findUserById (userId:string):Promise<UserByIdType | null>{
        const result =await usersCollection.findOne({_id:new ObjectId(userId)})
        if (result) {
            return {
                email:result.email,
                login: result.login,
                userId: result._id.toString()
            }
        }else{
            return null
        }
    }
}