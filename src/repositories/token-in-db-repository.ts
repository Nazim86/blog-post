import {tokensCollection} from "../db/db";
import {refreshTokenMetaDbType} from "./types/refreshToken-meta-db-type";

export const tokenInDbRepository = {

    async insertRefreshTokenMetaData (refreshTokenMeta:refreshTokenMetaDbType){
        await tokensCollection.insertOne(refreshTokenMeta)

    }
}