import {CronJob} from "cron";
import {client, tokensCollection} from "./db";
import mongoose from "mongoose";

export const clearExpiredTokens = new CronJob('0 * * * * *', async () => {
    try {

        const query = { expiration: { $lte: new Date().getTime() } };
        if(!query){
            return
        }
        const result = await tokensCollection.deleteMany({query});
        console.log(`${result.deletedCount} expired tokens deleted`);
        await client.close()
        await mongoose.connection.close()
    } catch (err) {
        console.error(err);
        await client.close()
        await mongoose.connection.close()
    }
});
