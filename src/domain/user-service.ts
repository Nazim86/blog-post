import {userRepository} from "../repositories/user-in-db-memory";
import {ObjectId} from "mongodb";
import bcrypt from 'bcrypt';
import {UserViewType} from "../types/user-view-type";



export const userService = {

    async createNewUser (login:string,password:string,email:string):Promise<UserViewType>{

        const passwordSalt = await bcrypt.genSalt(10)
        // const passwordHash = await bcrypt.hash(password,passwordSalt)
        const passwordHash  = await this._generateHash(password,passwordSalt)

        const newUser = {
            _id: new ObjectId(),
            login: login,
            passwordHash,
            email:email,
            createdAt: new Date().toISOString()

        }

        return  await userRepository.createNewUser(newUser)

},
    async _generateHash(password:string,passwordSalt:string):Promise<string>{

        const hash = await bcrypt.hash(password, passwordSalt)

        return hash
    },

    async deleteUser(id:string):Promise<boolean>{
        return await userRepository.deleteUser (id)
    }

}