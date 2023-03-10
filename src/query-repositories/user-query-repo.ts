import {usersCollection} from "../db/db";
import {Filter} from "mongodb";
import {UserDbType} from "../repositories/types/user-db-type";
import {userMapping} from "../mapping/user-mapping";

export const userQueryRepo = {
    async getUsers(sortBy: string, sortDirection: string, pageNumber: number, pageSize: number, searchLoginTerm: string, searchEmailTerm: string) {

        const skipSize = (pageNumber - 1) * pageSize;
        const filter: Filter<UserDbType> = {
            $or:
                [{login: {$regex: searchLoginTerm ?? "", $options: 'i'}},
                    {email: {$regex: searchEmailTerm ?? "", $options: "i"}}
                ]
        };
        const totalCount = await usersCollection.countDocuments(filter);
        const pagesCount = Math.ceil(totalCount / pageSize)

        const getUsers = await usersCollection.find(filter)
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

