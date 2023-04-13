import {CronJob} from "cron";
import { tokensCollection} from "./db";

export const clearExpiredTokens = new CronJob('0 * * * * *', async () => {
    // TODO:should write code to check connection here if isConnected to run below code if not then stop
    try {
        const query = { expiration: { $lte: new Date().getTime() } };
        if(!query){
            return
        }
        const result = await tokensCollection.deleteMany({query});
        console.log(`${result.deletedCount} expired tokens deleted`);
    } catch (err) {
        console.error(err);
    }
});
