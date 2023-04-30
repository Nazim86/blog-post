import {emailMessageType} from "../repositories/types/email-message-type";
import {EmailAdapter} from "../adapters/email-adapter";
import {injectable} from "inversify";

@injectable()
export class EmailManager {

    constructor( protected emailAdapter: EmailAdapter) {
    }

    async sendConfirmationEmail(confirmationCode:string, email:string, message:emailMessageType){
        await this.emailAdapter.sendConfirmationEmail(confirmationCode, email, message)

    }
}