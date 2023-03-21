import {emailAdapter} from "../adapters/email-adapter";

export const emailManager = {
    async sendConfirmationEmail(confirmationCode:string, email:string){

        await emailAdapter.sendConfirmationEmail(confirmationCode,email)

    }
}