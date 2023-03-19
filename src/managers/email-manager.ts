import {emailAdapter} from "../adapters/email-adapter";
import {UserAccountDbType} from "../repositories/types/user-account-db-type";

export const emailManager = {
    async sendConfirmationEmail(user:UserAccountDbType){

        await emailAdapter.sendConfirmationEmail(user.emailConfirmation.confirmationCode)

    }
}