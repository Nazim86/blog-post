import {DeviceViewType} from "../repositories/types/device-view-type";
import {tokenInDbRepository} from "../repositories/token-in-db-repository";
import {ObjectId} from "mongodb";

export const securityService = {

    async getDevices(ip: string, userId: string): Promise<DeviceViewType[]> {


        const devices:DeviceViewType[] = await tokenInDbRepository.getDevices(ip,userId)

        return devices

    },

    async checkDevice(ip: string, deviceName:string,userId: ObjectId): Promise<DeviceViewType> {


        const device:DeviceViewType = await tokenInDbRepository.checkDevice(ip,deviceName,userId)

        return device

    },

   async updateDevice(deviceId:string,lastActiveDate:string):Promise<boolean>{
      return await tokenInDbRepository.updateDevice(deviceId,lastActiveDate)

   },

    async deleteDevices(deviceName:string){



    }
}
