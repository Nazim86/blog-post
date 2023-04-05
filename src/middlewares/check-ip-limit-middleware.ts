import {NextFunction, Request, Response} from "express";
import {IpDataType} from "../repositories/types/ip-type";
import {ipCollection} from "../db/db";


export const checkIpLimitMiddleware = async (req: Request, res: Response, next: NextFunction) => {


    const ipDataByIpAddress: IpDataType|null= await ipCollection.findOne({$and :[{ipAddress:req.ip},{endPoint: req.originalUrl}]})

    if (!ipDataByIpAddress) {

        const ipData: IpDataType = {
            endPoint: req.originalUrl,
            ipAddress: req.ip,
            issuedAt: new Date().getTime(),
            attempts: 2
        }
        await ipCollection.insertOne(ipData)
    }

    if (ipDataByIpAddress) {

        if ((new Date().getTime() - ipDataByIpAddress.issuedAt) > 10000) {
            await ipCollection.updateOne({$and :[{ipAddress:req.ip},{endPoint: req.originalUrl}]},{$set:{attempts:1,issuedAt:new Date().getTime()}})

            return next()
        }

        if (ipDataByIpAddress.attempts > 5) {
            return res.sendStatus(429)
        }

        if ((new Date().getTime() - ipDataByIpAddress.issuedAt) < 10000) {
            await ipCollection.updateOne({$and :[{ipAddress:req.ip},{endPoint: req.originalUrl}]},{$inc:{attempts:1}})

            return next()

        }
    }

    next()


}