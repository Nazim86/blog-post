import {NextFunction, Request, Response} from "express";

import {usersAccountsCollection} from "../db/db";

export const checkUsersAccountsCredentialsMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    const login = req.body.login
    const email = req.body.email

    const checkCredentials = await usersAccountsCollection.findOne({$or: [{"accountData.login": login}, {"accountData.email": email}]})

    if (checkCredentials) {
        res.status(400).send("This user exists in the system")
    }
    else {
        next()
    }

}