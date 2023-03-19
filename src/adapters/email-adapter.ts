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
            subject: "Email Confitmation", // Subject line
            text: `Please click this link to confirm your email`, // plain text body
            html: `<p>${confirmationCode}</p>`, // html body
        });

        return info
    },


}