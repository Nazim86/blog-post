import {DeviceViewType} from "../repositories/types/device-view-type";
import {tokenInDbRepository} from "../repositories/token-in-db-repository";

export const securityService = {

    async getDevices(ip: string, userId: string): Promise<DeviceViewType[]> {


        return await tokenInDbRepository.getDevices(ip, userId)

    },


   // async updateDevice(deviceId:string,lastActiveDate:string):Promise<boolean>{
   //    return await tokenInDbRepository.updateDevice(deviceId,lastActiveDate)
   //
   // },

    async deleteDevices(deviceId:string){

       return await tokenInDbRepository.deleteDevices(deviceId);


    }
}
