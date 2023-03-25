import {ObjectId} from "mongodb";
import bcrypt from 'bcrypt';
import {authRepository} from "../repositories/auth-db-repository";
import { v4 as uuid } from 'uuid';
import add from "date-fns/add"
import {UserAccountDbType} from "../repositories/types/user-account-db-type";
import {emailManager} from "../managers/email-manager";
import {usersAccountsCollection} from "../db/db";




export const authService = {

    async createNewUser(login: string, password: string, email: string): Promise<UserAccountDbType |null> {

        const passwordSalt = await bcrypt.genSalt(10)
        const passwordHash = await this._generateHash(password, passwordSalt)

        const newUser: UserAccountDbType = {
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
                isConfirmed:false,
                sentEmailsByDate:new Date()
            }
        }


        const createUser = await authRepository.createNewUser(newUser)


        try {
            await emailManager.sendConfirmationEmail(createUser.emailConfirmation.confirmationCode,
                createUser.accountData.email)

        }
        catch (e){
            return null
        }

        return createUser

    },

    async _generateHash(password: string, passwordSalt: string): Promise<string> {

        return await bcrypt.hash(password, passwordSalt)
    },

    async registrationConfirmation(code:string):Promise<boolean>{

        const user:UserAccountDbType | null = await authRepository.findUserByConfirmationCode(code)

        if(!user) return false
        if(user.emailConfirmation.isConfirmed) return false
        if (user.emailConfirmation.confirmationCode !== code) return false
        if (user.emailConfirmation.emailExpiration < new Date()) return false

        return await authRepository.updateConfirmation(user._id)
    },

    async resendEmail(email:string):Promise<string|boolean>{

        const user:UserAccountDbType | null = await authRepository.findUserByEmail(email)

        if(!user) return false
        if(user.emailConfirmation.isConfirmed) return false
        if (user.emailConfirmation.emailExpiration < new Date()) return false



        try {
            //Checking time difference between last email sent date. Should be more than 10 sec. to send again
            if(new Date().getTime()-user.emailConfirmation.sentEmailsByDate.getTime()<10000 ) {
                return "Try"
            }
            const newCode = uuid()
            console.log(user.emailConfirmation.sentEmailsByDate)
            await usersAccountsCollection.updateMany({_id:user._id},[{$set:{"emailConfirmation.confirmationCode":newCode}},
                {$set:{"emailConfirmation.sentEmailsByDate":new Date()}}])

            await emailManager.sendConfirmationEmail(newCode,user.accountData.email)
        }
        catch (e){
            return false
        }

        return true

    },

    async deleteUser(id: string): Promise<boolean> {
        return await authRepository.deleteUser(id)
    },

    async checkCredentials(loginOrEmail: string, password: string): Promise<UserAccountDbType | null> {

        const user: UserAccountDbType | null = await authRepository.checkCredentials(loginOrEmail)

        if (!user) return null

        if(!user.emailConfirmation.isConfirmed) return null

        const passwordSalt = user.accountData.passwordSalt;

        const passwordHash = await this._generateHash(password, passwordSalt);

        if (passwordHash !== user.accountData.passwordHash) return null

        return user
    },

    async findUserById (userId:string):Promise<UserAccountDbType |null>{
        return await authRepository.findUserById(userId)
    }
}



