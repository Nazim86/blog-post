import {tokensCollection} from "../db/db";
import {RefreshTokenMetaDbType} from "./types/refresh-token-meta-db-type";
import {DeviceViewType} from "./types/device-view-type";
import {ObjectId} from "mongodb";
import {deviceMapping} from "../mapping/device-mapping";

export const tokenInDbRepository = {

    async insertRefreshTokenMetaData(refreshTokenMeta: RefreshTokenMetaDbType) {
        await tokensCollection.insertOne(refreshTokenMeta)

    },

    async getDevices(ip: string, userId: string):Promise<DeviceViewType[]> {
        const deviceDataByUserId = await tokensCollection.find({userId: userId}).toArray()
        console.log(deviceDataByUserId)
        const mappedDevices: DeviceViewType[] = deviceMapping(deviceDataByUserId,ip)
        return mappedDevices

    },

    async checkDevice(ip: string, deviceName:string,userId: ObjectId): Promise<DeviceViewType> {

        const device:DeviceViewType = await tokensCollection.findOne({ip:ip,title:deviceName,userId:userId.toString()})

        return device

    },

    async updateDevice(deviceId:string,lastActiveDate:string):Promise<boolean>{

        const result = await tokensCollection.updateOne({deviceId:deviceId},{$set:{lastActiveDate:lastActiveDate}})
    return result.modifiedCount ===1
    }
}