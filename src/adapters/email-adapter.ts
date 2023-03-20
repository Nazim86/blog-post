import nodemailer from "nodemailer"

export const emailAdapter={
    async sendConfirmationEmail(confirmationCode:string){

        // create reusable transporter object using the default SMTP transport
        let transporter = nodemailer.createTransport({
            service:"gmail",
            auth: {
                user: "fuadson86@gmail.com ", // generated ethereal user
                pass: "gjzqiqyfzudigipo", // generated ethereal password
            },
        });

        // send mail with defined transport object
        let info = await transporter.sendMail({
            from: '"Jan Cloude Vandamme 👻" <fuadson86@gmail.com>', // sender address
            to: "fuadson86@gmail.com", // list of receivers
            subject: "Email Confirmation", // Subject line
            html: ` <h1>Thank for your registration</h1>
       <p>To finish registration please follow the link below:
          <a href='https://somesite.com/confirm-email?code=${confirmationCode}'>complete registration</a>
      </p>
     `,// html body
        });

        return info
    },


}