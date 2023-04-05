import {tokensCollection} from "../db/db";
import {RefreshTokenMetaDbType} from "./types/refresh-token-meta-db-type";
import {DeviceViewType} from "./types/device-view-type";
import {deviceMapping} from "../mapping/device-mapping";

export const tokenInDbRepository = {

    async insertRefreshTokenMetaData(refreshTokenMeta: RefreshTokenMetaDbType) {
        await tokensCollection.insertOne(refreshTokenMeta)

    },

    async getDevices(ip: string, userId: string): Promise<DeviceViewType[]> {
        const deviceDataByUserId = await tokensCollection.find({userId: userId}).toArray()
        const mappedDevices: DeviceViewType[] = deviceMapping(deviceDataByUserId, ip)
        return mappedDevices

    },

    async getDevicesByDeviceId(deviceId: string): Promise<RefreshTokenMetaDbType|null> {
        return await tokensCollection.findOne({deviceId: deviceId})

    },

    async updateDevice(deviceId:string,lastActiveDate:string):Promise<boolean> {
       const result= await tokensCollection.updateOne({deviceId:deviceId},{$set:{lastActiveDate:lastActiveDate}})
   return result.modifiedCount === 1
    },

    async deleteDevices(deviceId: string):Promise<boolean> {
        const result = await tokensCollection.deleteMany({deviceId: {$not: {$eq: deviceId}}});
        return result.deletedCount === 1
    },

    async deleteDeviceById(deviceId: string,userId:string) {
        const result = await tokensCollection.deleteOne({deviceId: deviceId,userId:userId});
        return result.deletedCount === 1
    }
}