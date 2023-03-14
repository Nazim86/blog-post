import {NextFunction, Request, Response} from "express";

export const baseAuthorizationMiddleware = (req:Request, res:Response, next: NextFunction)=>{

    const userLoginPassword = req.headers.authorization

    const encodedLoginPassword: string = Buffer.from("admin:qwerty", 'utf8').toString('base64');

    if (userLoginPassword != "Basic "+encodedLoginPassword ) {
        return res.sendStatus(401)
    }else{
        next()
    }
}
