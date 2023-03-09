import {userRepository} from "../repositories/user-in-db-memory";
import {ObjectId} from "mongodb";
import bcrypt from 'bcrypt';
import {UserViewType} from "../types/user-view-type";
import {UserDbType} from "../types/user-db-type";



export const userService = {

    async createNewUser (login:string,password:string,email:string):Promise<UserViewType>{

        const passwordSalt = await bcrypt.genSalt(10)
        const passwordHash  = await this._generateHash(password,passwordSalt)

        const newUser = {
            _id: new ObjectId(),
            login: login,
            passwordHash,
            passwordSalt,
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
    },

    async checkCredentials(loginOrEmail:string,password:string):Promise<UserDbType | null> {

        const user = await userRepository.checkCredentials(loginOrEmail)

        if (!user) return user

            const passwordSalt = user.passwordSalt;

            const passwordHash = await this._generateHash(password, passwordSalt);

            if (passwordHash !== user.passwordHash){

                return user
            }
            return user

    }


}