import {emailAdapter} from "../adapters/email-adapter";
import {UserAccountDbType} from "../repositories/types/user-account-db-type";

export const emailManager = {
    async sendConfirmationEmail(user:UserAccountDbType){
//generate new confirmation code
        await emailAdapter.sendConfirmationEmail(user.emailConfirmation.confirmationCode,user.accountData.email)

    }
}