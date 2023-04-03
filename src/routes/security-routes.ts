import {Request, Response, Router} from "express";
import {DeviceViewType} from "../repositories/types/device-view-type";
import {securityService} from "../domain/security-service";
import {checkRefreshTokenMiddleware} from "../middlewares/check-refreshToken-middleware";
import {jwtService} from "../domain/jwt-service";
import {deviceIdValidation} from "../validations/device-validations";
import {inputValidationErrorsMiddleware} from "../middlewares/input-validation-errors-middleware";

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

securityRoutes.delete("/devices/:id", deviceIdValidation,inputValidationErrorsMiddleware,checkRefreshTokenMiddleware,
    async (req: Request, res: Response) => {
        const {userId} = await jwtService.getRefreshTokenMetaData(req.cookies.refreshToken)

        const result = await securityService.deleteDeviceById(req.params.id,userId)
        if (!result){
            res.sendStatus(404)
        }

    res.sendStatus(204)
})
