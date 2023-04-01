import {NextFunction, Request, Response} from "express";



export const checkIpLimitMiddleware = async (req: Request, res: Response, next: NextFunction) => {

    const ipAddress = req.header('x-forwarded-for')

}