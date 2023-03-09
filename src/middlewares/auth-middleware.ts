import {Request,Response,NextFunction} from "express";
import {userService} from "../domain/user-service";
import {jwtService} from "../domain/jwt-service";

export const authMiddleware = async (req:Request,res:Response,next:NextFunction)=>{

    if (!req.headers.authorization){
        res.send(401)
return
    }

    const token = req.headers.authorization.split(" ")[1]

    const userId = await jwtService.getUserIdByToken(token)

    //TODO need to finish repairing middleware


    const {loginOrEmail, password} = req.body;

    const checkCredentials = await userService.checkCredentials(loginOrEmail, password)

    if (checkCredentials) {
        next()
    }else{
        res.sendStatus(401)
    }

}