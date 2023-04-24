import nodemailer from "nodemailer"
import {emailMessageType} from "../repositories/types/email-message-type";

export class EmailAdapter {
    async sendConfirmationEmail(code: string, email: string, message: emailMessageType) {

        // create reusable transporter object using the default SMTP transport
        let transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.gmailEmail, // generated ethereal user
                pass: process.env.gmailPass, // generated ethereal password
            },
        });

        // await new Promise((resolve, reject) => {
        //     // verify connection configuration
        //     transporter.verify(function (error: Error | null, success: boolean) {
        //         if (error) {
        //             console.log(error);
        //             reject(error);
        //         } else {
        //             console.log("Server is ready to take our messages");
        //             resolve(success);
        //         }
        //     });
        // });

        const mailData = {
            from: '"Jan Cloude Vandamme 👻" <fuadson86@gmail.com>', // sender address
            to: email, // list of receivers
            subject: message.subject, // Subject line
            html: ` <h1>${message.html}</h1>
       <p>To finish ${message.paragraph} please follow the link below:
          <a href='${message.link}${code}'>complete ${message.paragraph}</a>
      </p>`,// html body
        }

            // send mail
            transporter.sendMail(
                mailData,
            );
    }
}
