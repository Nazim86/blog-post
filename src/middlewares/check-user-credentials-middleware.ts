import {NextFunction, Request, Response} from "express";

import {usersCollection} from "../db/db";

export const checkUserCredentialsMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    const login = req.body.login
    const email = req.body.email

    const checkCredentials = await usersCollection.findOne({$or: [{login: login}, {email: email}]})

    if (checkCredentials) {
        res.status(400).send("This user exists in the system")
    }
    else {
        next()
    }

}