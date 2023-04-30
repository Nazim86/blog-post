import {TokenModel} from "../db/db";
import {RefreshTokenMetaDbType} from "./types/refresh-token-meta-db-type";
import {DeviceViewType} from "./types/device-view-type";
import {deviceMapping} from "../mapping/device-mapping";
import {injectable} from "inversify";


@injectable()
export class TokenInDbRepository {

    async insertRefreshTokenMetaData(refreshTokenMeta: RefreshTokenMetaDbType) {
        await TokenModel.create(refreshTokenMeta)
    }

    async getDevices(ip: string, userId: string): Promise<DeviceViewType[]> {
        const deviceDataByUserId = await TokenModel.find({userId: userId}).lean()
        const mappedDevices: DeviceViewType[] = deviceMapping(deviceDataByUserId, ip)
        return mappedDevices

    }

    async getDevicesByDeviceId(deviceId: string): Promise<RefreshTokenMetaDbType | null> {
        return TokenModel.findOne({deviceId: deviceId})
    }

    async updateDevice(deviceId: string, lastActiveDate: string): Promise<boolean> {
        const result = await TokenModel.updateOne({deviceId: deviceId}, {$set: {lastActiveDate: lastActiveDate}})
        return result.modifiedCount === 1
    }

    async deleteDevices(deviceId: string): Promise<boolean> {
        const result = await TokenModel.deleteMany({deviceId: {$not: {$eq: deviceId}}});
        return result.deletedCount === 1
    }

    async deleteDeviceById(deviceId: string, userId: string) {
        const result = await TokenModel.deleteOne({deviceId: deviceId, userId: userId});
        return result.deletedCount === 1
    }
}

