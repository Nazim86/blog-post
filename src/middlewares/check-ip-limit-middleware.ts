import {NextFunction, Request, Response} from "express";
import {ipCollection, IpDataType} from "../repositories/ip-in-memory-repository";


export const checkIpLimitMiddleware = async (req: Request, res: Response, next: NextFunction) => {

    const ipDataByIpAddress: IpDataType | undefined = ipCollection.find(i => i.ipAddress === req.ip && i.endPoint === req.originalUrl)

    if (!ipDataByIpAddress) {

        const ipData: IpDataType = {
            endPoint: req.originalUrl,
            ipAddress: req.ip,
            issuedAt: new Date().getTime(),
            attempts: 2
        }

        ipCollection.push(ipData)
    }

    if (ipDataByIpAddress) {

        if ((new Date().getTime() - ipDataByIpAddress.issuedAt) > 10000) {
            ipDataByIpAddress.attempts = 1
            ipDataByIpAddress.issuedAt = new Date().getTime()

        }



        if (ipDataByIpAddress.attempts > 5) {
            return res.sendStatus(429)
        }

        if ((new Date().getTime() - ipDataByIpAddress.issuedAt) < 10000) {
            ipDataByIpAddress.attempts = ipDataByIpAddress.attempts + 1
        }
    }
    console.log(ipCollection)

    next()


}