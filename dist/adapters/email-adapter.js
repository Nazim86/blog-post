"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.emailAdapter = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
exports.emailAdapter = {
    sendConfirmationEmail(confirmationCode) {
        return __awaiter(this, void 0, void 0, function* () {
            // create reusable transporter object using the default SMTP transport
            let transporter = nodemailer_1.default.createTransport({
                service: "gmail",
                auth: {
                    user: "fuadson86@gmail.com ",
                    pass: "gjzqiqyfzudigipo", // generated ethereal password
                },
            });
            // send mail with defined transport object
            let info = yield transporter.sendMail({
                from: '"Jan Cloude Vandamme 👻" <fuadson86@gmail.com>',
                to: "fuadson86@gmail.com",
                subject: "Email Confitmation",
                text: `Please click this link to confirm your email`,
                html: `<p>https://some-front.com/confirm-registration?code=${confirmationCode}</p>`, // html body
            });
            return info;
        });
    },
};
//# sourceMappingURL=email-adapter.js.map