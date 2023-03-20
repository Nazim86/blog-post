import {ObjectId} from "mongodb";
import bcrypt from 'bcrypt';
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
                isConfirmed:false
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

    async registrationConfirmation(code:string){
        const user = await authRepository.findUserByConfirmationCode(code)

        if(!user) return false
        if (user.emailConfirmation.confirmationCode !== code) return false
        if (user.emailConfirmation.emailExpiration < new Date()) return false

           return await authRepository.updateConfirmation(user._id)
    },

    async resendEmail(email:string){
        const user = await authRepository.findUserByEmail(email)

        if(!user) return false
        if(user.emailConfirmation.isConfirmed) return true
        if (user.emailConfirmation.emailExpiration < new Date()) return false

        try {
            await emailManager.sendConfirmationEmail(user)
        }
        catch (e){
            return null
        }

        return user

    },

    async deleteUser(id: string): Promise<boolean> {
        return await authRepository.deleteUser(id)
    },

    async checkCredentials(loginOrEmail: string, password: string): Promise<UserAccountDbType | null> {

        const user = await authRepository.checkCredentials(loginOrEmail)

        if (!user) return null
        if(!user.emailConfirmation.isConfirmed) return null

        const passwordSalt = user.accountData.passwordSalt;

        const passwordHash = await this._generateHash(password, passwordSalt);

        if (passwordHash !== user.accountData.passwordHash) return null

        return user
    },

    async findUserById (userId:string):Promise<UserByIdType |null>{
        return await authRepository.findUserById(userId)
    }


}
