import {NextFunction, Request, Response} from "express";

export const baseAuthorizationMiddleware = (req:Request, res:Response, next: NextFunction)=>{

    const login = req.headers.login
    const password = req.headers.password

    if (login != "admin" || password != "qwerty") {
        return res.send(401)
    }else{
        next()
    }
}
