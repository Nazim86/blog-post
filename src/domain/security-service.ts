import {DeviceViewType} from "../repositories/types/device-view-type";
import {tokenInDbRepository} from "../repositories/token-in-db-repository";
import {jwtService} from "./jwt-service";
import {settings} from "../settings";

export const securityService = {

    async getDevices(ip: string, userId: string): Promise<DeviceViewType[]> {


        return await tokenInDbRepository.getDevices(ip, userId)

    },


   async updateDevice(refreshToken:string):Promise<boolean>{
       const {deviceId,lastActiveDate}= await jwtService.getRefreshTokenMetaData(refreshToken,settings.REFRESH_TOKEN_SECRET)

      return await tokenInDbRepository.updateDevice(deviceId,lastActiveDate)

   },

    async deleteDevices(deviceId:string):Promise<boolean> {
       return await tokenInDbRepository.deleteDevices(deviceId);
    },

    async deleteDeviceById(deviceId:string,userId:string): Promise<Result<boolean|null>> {
        const device = await tokenInDbRepository.getDevicesByDeviceId(deviceId);

        if (device && device.userId!==userId){
            return {
                data:false,
                code:ResultCode.Forbidden
            }
        }

        const isDeleted =  await tokenInDbRepository.deleteDeviceById(deviceId,userId);

        return {
            data: isDeleted,
            code: isDeleted ? ResultCode.Success : ResultCode.NotFound
        }
    }
}

export enum ResultCode {
    Success,
    Unauthorized,
    NotFound,
    Forbidden
}

export type Result<T> = {
    code: ResultCode
    data: T,
    message?: string
}

