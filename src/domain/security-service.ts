import {DeviceViewType} from "../repositories/types/device-view-type";
import {settings} from "../settings";
import {ResultCode} from "../error-handler/result-code-enum";
import {Result} from "../error-handler/result-type";
import {JwtService} from "./jwt-service";
import {TokenInDbRepository} from "../repositories/token-in-db-repository";
import {clearExpiredTokens} from "../db/db-clearing-expired-tokens";


export class SecurityService {


    constructor(protected jwtService: JwtService,
                protected tokenInDbRepository: TokenInDbRepository) {
    }

    private deleteOldDevices() {
        clearExpiredTokens.start();
    }


    async getDevices(ip: string, userId: string): Promise<DeviceViewType[]> {
        return await this.tokenInDbRepository.getDevices(ip, userId)

    }

    async updateDevice(refreshToken: string): Promise<boolean> {
        const {
            deviceId,
            lastActiveDate
        } = await this.jwtService.getTokenMetaData(refreshToken, settings.REFRESH_TOKEN_SECRET)

        return await this.tokenInDbRepository.updateDevice(deviceId, lastActiveDate)

    }

    async deleteDevices(deviceId: string): Promise<boolean> {
        return await this.tokenInDbRepository.deleteDevices(deviceId);
    }

    async deleteDeviceById(deviceId: string, userId: string): Promise<Result<boolean | null>> {
        const device = await this.tokenInDbRepository.getDevicesByDeviceId(deviceId);

        if (device && device.userId !== userId) {
            return {
                data: false,
                code: ResultCode.Forbidden
            }
        }

        const isDeleted = await this.tokenInDbRepository.deleteDeviceById(deviceId, userId);

        return {
            data: isDeleted,
            code: isDeleted ? ResultCode.Success : ResultCode.NotFound
        }
    }
}



