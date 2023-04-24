import {Request, Response, Router} from "express";
import {DeviceViewType} from "../repositories/types/device-view-type";
import {checkRefreshTokenMiddleware} from "../middlewares/check-refreshToken-middleware";
import {deviceIdValidation} from "../validations/device-validations";
import {inputValidationErrorsMiddleware} from "../middlewares/input-validation-errors-middleware";
import {handleErrorResult} from "../error-handler/handle-error-result";
import {ResultCode} from "../error-handler/result-code-enum";
import {JwtService} from "../domain/jwt-service";
import {SecurityService} from "../domain/security-service";



export const securityRoutes = Router({})

class SecurityController {

    private jwtService: JwtService
    private securityService: SecurityService
    constructor() {
        this.jwtService = new JwtService()
        this.securityService = new SecurityService()
    }

    async getDevices(req: Request, res: Response) {
        const devices: DeviceViewType[] = await this.securityService.getDevices(req.ip, req.context.user!._id.toString())
        res.status(200).send(devices)
    }

    async deleteDevices(req: Request, res: Response) {
        const {deviceId} = await this.jwtService.getTokenMetaData(req.cookies.refreshToken)
        await this.securityService.deleteDevices(deviceId)
        res.sendStatus(204)
    }

    async deleteDeviceByDeviceId(req: Request, res: Response) {
        const {userId} = await this.jwtService.getTokenMetaData(req.cookies.refreshToken)

        const result = await this.securityService.deleteDeviceById(req.params.id, userId)

        if (result.code !== ResultCode.Success) {
            return handleErrorResult(res, result.code)
        }
        res.sendStatus(204)
    }

}

const securityController = new SecurityController()

securityRoutes.get("/devices", checkRefreshTokenMiddleware, securityController.getDevices.bind(securityController))

securityRoutes.delete("/devices", checkRefreshTokenMiddleware, securityController.deleteDevices.bind(securityController))

securityRoutes.delete("/devices/:id", deviceIdValidation, inputValidationErrorsMiddleware, checkRefreshTokenMiddleware,
    securityController.deleteDeviceByDeviceId.bind(securityController))

