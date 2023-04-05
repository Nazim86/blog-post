import {NextFunction, Request, Response} from "express";
import {IpDataType} from "../repositories/types/ip-type";
import {ipCollection} from "../db/db";

let x =1
let y =1
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
            // const result = await ipCollection.deleteMany({})
            const result = await ipCollection.updateOne({$and :[{ipAddress:req.ip},{endPoint: req.originalUrl}]},{$set:{attempts:1,issuedAt:new Date().getTime()}})

            // const result = await ipCollection.updateOne({ipAddress:req.ip},{$set:{attempts:1,issuedAt:new Date().getTime()}})
            // ipDataByIpAddress.attempts = 1
            // ipDataByIpAddress.issuedAt = new Date().getTime()

            // console.log("resetting",await ipCollection.findOne({$and :[{ipAddress:req.ip},{endPoint: req.originalUrl}]}))
            // console.log("reset",x++)
        }

        if (ipDataByIpAddress.attempts > 5) {
            console.log("Attempts more than 5",x++)
            return res.sendStatus(429)
        }

        if ((new Date().getTime() - ipDataByIpAddress.issuedAt) < 10000) {
            const result = await ipCollection.updateOne({$and :[{ipAddress:req.ip},{endPoint: req.originalUrl}]},{$inc:{attempts:1}})
            // console.log("counting attempt",y++)
            const ipData = await ipCollection.findOne({$and: [{ipAddress: req.ip}, {endPoint: req.originalUrl}]})
            console.log("Counting attempt",ipData?.attempts )

            // ipDataByIpAddress.attempts = ipDataByIpAddress.attempts + 1
        }
    }
    // console.log(ipCollection) dell

    next()


}