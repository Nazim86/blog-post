import {NextFunction, Request, Response} from "express";

import {usersAccountsCollection} from "../db/db";
import {errorMessage} from "../error-handler/error-handler";

export const checkUsersAccountsCredentialsMiddleware = async ( req: Request, res: Response, next: NextFunction) => {
    const login = req.body.login
    const email = req.body.email

    const checkCredentials = await usersAccountsCollection.findOne({$or: [{"accountData.login": login}, {"accountData.email": email}]})


    if (checkCredentials) {
        let msg = "Existing email or login"
        let field
        if (login === checkCredentials.accountData.login){
            field = "login"
        }else{
            field = "email"
        }
        res.status(400).send(errorMessage(msg,field))

    } else {
        next()
    }
}




