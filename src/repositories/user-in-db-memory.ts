import {usersCollection} from "../db/db";
import {UserDbType} from "../types/user-db-type";
import {UserViewType} from "../types/user-view-type";

import {ObjectId} from "mongodb";

export const userRepository = {
    async createNewUser(newUser:UserDbType):Promise<UserViewType>{

 await usersCollection.insertOne(newUser)

        return{

            id:newUser._id.toString(),
            login:newUser.login,
            email:newUser.email,
            createdAt: newUser.createdAt
        }


    },

    async deleteUser (id:string):Promise<boolean>{
        const result =  await usersCollection.deleteOne({_id: new ObjectId(id)});
        return result.deletedCount === 1;
    },

    async checkCredentials(loginOrEmail:string):Promise<UserDbType | null>{
        const user  = await usersCollection.findOne({$or:[{login:loginOrEmail}, {email:loginOrEmail}]})
        console.log(user)
        return user
    }
}