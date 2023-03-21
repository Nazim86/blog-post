import {userRepository} from "../repositories/user-in-db-repository";
import {ObjectId} from "mongodb";
import bcrypt from 'bcrypt';
import {UserViewType} from "../repositories/types/user-view-type";
import {UserByIdType} from "../repositories/types/user-by-id-type";
import {v4 as uuid} from "uuid";
import add from "date-fns/add";
import {UserAccountDbType} from "../repositories/types/user-account-db-type";


export const userService = {

    async createNewUser(login: string, password: string, email: string): Promise<UserViewType> {

        const passwordSalt = await bcrypt.genSalt(10)
        const passwordHash = await this._generateHash(password, passwordSalt)

        const newUser = {
            _id: new ObjectId(),
            accountData: {
                login: login,
                passwordHash,
                passwordSalt,
                email: email,
                createdAt: new Date().toISOString()
            },
            emailConfirmation:{
                confirmationCode:uuid(),
                emailExpiration: add(new Date(),{
                    hours:1,
                    minutes:3
                }),
                isConfirmed:true
            }
        }


        return await userRepository.createNewUser(newUser)

    },

    async _generateHash(password: string, passwordSalt: string): Promise<string> {

        return await bcrypt.hash(password, passwordSalt)
    },

    async deleteUser(id: string): Promise<boolean> {
        return await userRepository.deleteUser(id)
    },

    async checkCredentials(loginOrEmail: string, password: string): Promise<UserAccountDbType | null> {

        const user = await userRepository.checkCredentials(loginOrEmail)

        if (!user) return null

        const passwordSalt = user.accountData.passwordSalt;

        const passwordHash = await this._generateHash(password, passwordSalt);

        if (passwordHash !== user.accountData.passwordHash) {
            return null
        }
        return user
    },

    async findUserById (userId:string):Promise<UserByIdType |null>{
        return await userRepository.findUserById(userId)
    }


}