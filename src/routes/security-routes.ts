import {Request, Response, Router} from "express";
import {DeviceViewType} from "../repositories/types/device-view-type";
import {securityService} from "../domain/security-service";
import {checkRefreshTokenMiddleware} from "../middlewares/check-refreshToken-middleware";
import {jwtService} from "../domain/jwt-service";

export const securityRoutes = Router({})

securityRoutes.get("/devices", checkRefreshTokenMiddleware, async (req: Request, res: Response) => {

    const devices: DeviceViewType[] = await securityService.getDevices(req.ip, req.context.user!._id.toString())
    res.status(200).send(devices)
})

securityRoutes.delete("/devices", checkRefreshTokenMiddleware, async (req: Request, res: Response) => {
const {deviceId} = await jwtService.getRefreshTokenMetaData(req.cookies.refreshToken)
    console.log(deviceId)
    await securityService.deleteDevices(deviceId)
    res.sendStatus(204)
})
