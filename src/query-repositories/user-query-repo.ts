
import {Filter} from "mongodb";
import {userMapping} from "../mapping/user-mapping";
import {usersAccountsCollection} from "../db/db";
import {UserAccountDbType} from "../repositories/types/user-account-db-type";

export const userQueryRepo = {
    async getUsers(sortBy: string, sortDirection: string, pageNumber: number, pageSize: number, searchLoginTerm: string, searchEmailTerm: string) {

        const skipSize = (pageNumber - 1) * pageSize;
        const filter: Filter<UserAccountDbType> = {
            $or:
                [{"accountData.login": {$regex: searchLoginTerm ?? "", $options: 'i'}},
                    {"accountData.email": {$regex: searchEmailTerm ?? "", $options: "i"}}
                ]
        };
        const totalCount = await usersAccountsCollection.countDocuments(filter);
        const pagesCount = Math.ceil(totalCount / pageSize)

        const getUsers = await usersAccountsCollection.find(filter)
            .sort({[sortBy]: sortDirection === 'asc' ? 1 : -1})
            .skip(skipSize)
            .limit(pageSize)
            .toArray()



        const mappedUsers = userMapping(getUsers)

        return {
            pagesCount: pagesCount,
            page: pageNumber,
            pageSize: pageSize,
            totalCount: totalCount,
            items: mappedUsers
        }

    }
}

