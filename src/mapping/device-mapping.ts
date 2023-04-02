import {RefreshTokenMetaDbType} from "../repositories/types/refresh-token-meta-db-type";
import {DeviceViewType} from "../repositories/types/device-view-type";

export const deviceMapping = (array:RefreshTokenMetaDbType[],ip:string):DeviceViewType[]=>{
    return array.map((device:RefreshTokenMetaDbType):DeviceViewType=>{
        return {
            ip: ip,
            title: device.title,
            lastActiveDate: device.lastActiveDate,
            deviceId: device.deviceId
        }
    })
}