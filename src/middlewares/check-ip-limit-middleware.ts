import {NextFunction, Request, Response} from "express";
import {IpDataType} from "../repositories/types/ip-type";
import {IpModel} from "../db/db";


export const checkIpLimitMiddleware = async (req: Request, res: Response, next: NextFunction) => {

    const currentDate = new Date().getTime()
    const ipDataByIpAddress: IpDataType|null= await IpModel.findOne({$and :[{ipAddress:req.ip},{endPoint: req.originalUrl}]})

    if (!ipDataByIpAddress) {

        const ipData: IpDataType = {
            endPoint: req.originalUrl,
            ipAddress: req.ip,
            issuedAt: currentDate,
            attempts: 2
        }
        await IpModel.create(ipData)
    }

    if (ipDataByIpAddress) {

        if ((currentDate - ipDataByIpAddress.issuedAt) > 10000) {
            // await ipCollection.updateOne({$and :[{ipAddress:req.ip},{endPoint: req.baseUrl}]},{$set:{attempts:1,issuedAt:new Date().getTime()}})
            await IpModel.deleteMany({})
            return next()
        }

        if (ipDataByIpAddress.attempts > 5) {
            return res.sendStatus(429)
        }

        if ((currentDate - ipDataByIpAddress.issuedAt) < 10000) {
            await IpModel.updateOne({$and :[{ipAddress:req.ip},{endPoint: req.originalUrl}]},{$inc:{attempts:1}})

            return next()

        }
    }

    next()


}