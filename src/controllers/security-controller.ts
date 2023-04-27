import {JwtService} from "../domain/jwt-service";
import {SecurityService} from "../domain/security-service";
import {Request, Response} from "express";
import {DeviceViewType} from "../repositories/types/device-view-type";
import {ResultCode} from "../error-handler/result-code-enum";
import {handleErrorResult} from "../error-handler/handle-error-result";

export class SecurityController {


    constructor(protected jwtService: JwtService,
                protected securityService: SecurityService) {

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