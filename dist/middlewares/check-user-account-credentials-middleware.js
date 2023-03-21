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
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkUsersAccountsCredentialsMiddleware = void 0;
const db_1 = require("../db/db");
const checkUsersAccountsCredentialsMiddleware = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const login = req.body.login;
    const email = req.body.email;
    const checkCredentials = yield db_1.usersAccountsCollection.findOne({ $or: [{ "accountData.login": login }, { "accountData.email": email }] });
    // const errorsMessages = validationResult(req);
    // if (!errorsMessages.isEmpty()) {
    //     const errorsResponse =
    //         errorsMessages.array({onlyFirstError:true}).map(err=>({
    //             message: err.msg,
    //             field: err.param
    //         }))
    //     if (checkCredentials){ return res.status(400).json({errorsMessages: errorsResponse})};
    // } else{
    //     next()
    // }
    if (checkCredentials) {
        res.status(400).send({
            errorsMessages: [{
                    message: "Existing users",
                    field: "email"
                }]
        });
    }
    else {
        next();
    }
});
exports.checkUsersAccountsCredentialsMiddleware = checkUsersAccountsCredentialsMiddleware;
//
// try {
//     if (checkCredentials) {
//         throw new Error("msg");
//
//     }
// } catch (e) {
//     console.log("for new Error()");
//     console.log(e);
//     res.sendStatus(400)
// }
//
// next()
//# sourceMappingURL=check-user-account-credentials-middleware.js.map