import {NextFunction, Request, Response} from "express";

import {UserAccountModel} from "../db/db";

export const checkUserCredentialsMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    const login = req.body.login
    const email = req.body.email

    const checkCredentials = await UserAccountModel.findOne({$or: [{"accountData.login": login}, {"accountData.email": email}]})

    if (checkCredentials) {
        res.status(400).send("This user exists in the system")
    }
    else {
        next()
    }

}