import {emailAdapter} from "../adapters/email-adapter";
import {emailMessageType} from "../repositories/types/email-message-type";

export const emailManager = {
    async sendConfirmationEmail(confirmationCode:string, email:string, message:emailMessageType){
        await emailAdapter.sendConfirmationEmail(confirmationCode, email, message)

    }
}