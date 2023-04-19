import {ObjectId} from "mongodb";
import bcrypt from 'bcrypt';
import {userRepository} from "../repositories/user-in-db-repository";
import {v4 as uuid} from 'uuid';
import add from "date-fns/add"
import {UserAccountDbType} from "../repositories/types/user-account-db-type";
import {emailManager} from "../managers/email-manager";
import {UserAccountModel} from "../db/db";
import {UserAccountViewType} from "../repositories/types/user-account-view-type";
import {tokenInDbRepository} from "../repositories/token-in-db-repository";
import {jwtService} from "./jwt-service";
import {passwordRecoveryMessage, registrationMessage} from "../managers/email-messages-repo";

export const authService = {

    async createNewUser(login: string, password: string, email: string): Promise<UserAccountDbType | null> {

        const passwordHash = await bcrypt.hash(password, 10)

        const newUser: UserAccountDbType = {
            _id: new ObjectId(),
            accountData: {
                login: login,
                passwordHash,
                email: email,
                createdAt: new Date().toISOString(),
                recoveryCode:uuid(),
                recoveryCodeExpiration:add(new Date(), {
                    hours: 1,
                    minutes: 3
                })
            },
            emailConfirmation: {
                confirmationCode: uuid(),
                emailExpiration: add(new Date(), {
                    hours: 1,
                    minutes: 3
                }),
                isConfirmed: false,
            }
        }

        const createUser = await userRepository.createNewUser(newUser)

        try {
            await emailManager.sendConfirmationEmail(createUser.emailConfirmation.confirmationCode,
                createUser.accountData.email, registrationMessage)

        } catch (e) {
            return null
        }

        return createUser

    },

    async registrationConfirmation(code: string): Promise<boolean> {

        const user: UserAccountDbType | null = await userRepository.findUserByConfirmationCode(code)

        if (!user) return false
        if (user.emailConfirmation.isConfirmed) return false
        if (user.emailConfirmation.confirmationCode !== code) return false
        if (user.emailConfirmation.emailExpiration < new Date()) return false

        return await userRepository.updateConfirmation(user._id)
    },

    async resendEmail(email: string): Promise<string | boolean> {

        const user: UserAccountDbType | null = await userRepository.findUserByEmail(email)

        if (!user) return false
        if (user.emailConfirmation.isConfirmed) return false
        if (user.emailConfirmation.emailExpiration < new Date()) return false

        try {
            const newCode = uuid()
            await UserAccountModel.updateMany({_id: user._id}, [{$set: {"emailConfirmation.confirmationCode": newCode}},
                {$set: {"emailConfirmation.sentEmailsByDate": new Date()}}])

            await emailManager.sendConfirmationEmail(newCode, user.accountData.email, registrationMessage)
        } catch (e) {
            return false
        }

        return true

    },

    async sendingRecoveryCode(email: string): Promise<boolean> {

        const user: UserAccountDbType | null = await userRepository.findUserByEmail(email)

        if (user) {

            try {
                const recoveryCode = uuid()
                await UserAccountModel.updateOne({_id: user._id}, {$set:
                        {
                            "accountData.recoveryCode": recoveryCode,
                            "accountData.recoveryCodeExpiration": add(new Date(), {
                                hours: 1,
                                minutes: 3
                            })}})

                await emailManager.sendConfirmationEmail(recoveryCode, user.accountData.email, passwordRecoveryMessage)
            } catch (e) {
                return true
            }
        }
        return true
    },

    async setNewPasswordByRecoveryCode(newPassword: string, recoveryCode: string): Promise<boolean> {

        const user: UserAccountDbType | null = await userRepository.findUserByRecoveryCode(recoveryCode)

        if (!user) return false
        // if (user.emailConfirmation.isConfirmed) return false
        if (user.accountData.recoveryCode !== recoveryCode) return false
        if (user.accountData.recoveryCodeExpiration < new Date()) return false

        const passwordHash = await bcrypt.hash(newPassword, 10)

        return await userRepository.updateUserAccountData(user._id, passwordHash)
    },

    async deleteUser(id: string): Promise<boolean> {
        return await userRepository.deleteUser(id)
    },

    async checkCredentials(loginOrEmail: string, password: string): Promise<boolean> {

        const user: UserAccountDbType | null = await userRepository.findUserByLoginOrEmail(loginOrEmail)

        if (!user) return false

        if (!user.emailConfirmation.isConfirmed) return false

        return bcrypt.compare(password, user.accountData.passwordHash)

    },

    async findUserById(userId: string): Promise<UserAccountDbType | null> {
        return await userRepository.findUserById(userId)
    },

    async getCurrentUser(user: UserAccountDbType): Promise<UserAccountViewType> {

        return {
            email: user.accountData.email,
            login: user.accountData.login,
            userId: user._id.toString(),
        }
    },

    async insertRefreshTokenMetaData(refreshToken: string, ip: string, deviceName: string) {
        const {deviceId, lastActiveDate, userId, expiration} = await jwtService.getTokenMetaData(refreshToken)


        const refreshTokenMeta = {
            lastActiveDate: lastActiveDate,
            deviceId: deviceId,
            ip: ip,
            title: deviceName,
            userId: userId,
            expiration: expiration
        }
        await tokenInDbRepository.insertRefreshTokenMetaData(refreshTokenMeta)
    },


}



