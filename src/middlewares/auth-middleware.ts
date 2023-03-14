import {Request, Response, NextFunction} from "express";
import {userService} from "../domain/user-service";
import {jwtService} from "../domain/jwt-service";

export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {

    if (!req.headers.authorization) {
        res.sendStatus(401)
        return
    }

    const token = req.headers.authorization.split(" ")[1]

    const userId = await jwtService.getUserIdByToken(token)

    if (!userId) {
        res.sendStatus(401)
    } else {
        req.context = {}
        req.context.user = await userService.findUserById(userId)
        next()
    }



}