import {ObjectId} from "mongodb";
import bcrypt from 'bcrypt';
import {UserDbType} from "../repositories/types/user-db-type";
import {UserByIdType} from "../repositories/types/user-by-id-type";
import {authRepository} from "../repositories/auth-db-repository";
import { v4 as uuid } from 'uuid';
import add from "date-fns/add"
import {UserAccountDbType} from "../repositories/types/user-account-db-type";
import {emailManager} from "../managers/email-manager";



export const authService = {

    async createNewUser(login: string, password: string, email: string): Promise<UserAccountDbType |null> {

        const passwordSalt = await bcrypt.genSalt(10)
        const passwordHash = await this._generateHash(password, passwordSalt)

        const newUser = {
            _id: new ObjectId(),
            accountData: {
                login: login,
                passwordHash,
                email: email,
                createdAt: new Date().toISOString()
            },
            emailConfirmation:{
                confirmationCode:uuid(),
                emailExpiration: add(new Date(),{
                    hours:1,
                    minutes:3
                })
            }
        }

        const createUser = await authRepository.createNewUser(newUser)

        try {
            await emailManager.sendConfirmationEmail(createUser)
        }
        catch (e){
            return null
        }

        return createUser

    },

    async _generateHash(password: string, passwordSalt: string): Promise<string> {

        return await bcrypt.hash(password, passwordSalt)
    },

    async deleteUser(id: string): Promise<boolean> {
        return await authRepository.deleteUser(id)
    },

    async checkCredentials(loginOrEmail: string, password: string): Promise<UserDbType | null> {

        const user = await authRepository.checkCredentials(loginOrEmail)

        if (!user) return null

        const passwordSalt = user.passwordSalt;

        const passwordHash = await this._generateHash(password, passwordSalt);

        if (passwordHash !== user.passwordHash) {
            return null
        }
        return user
    },

    async findUserById (userId:string):Promise<UserByIdType |null>{
        return await authRepository.findUserById(userId)
    }


}