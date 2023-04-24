
import {userMapping} from "../mapping/user-mapping";
import {UserAccountModel} from "../db/db";


export class UserQueryRepo {

    async getUsers(sortBy: string, sortDirection: string, pageNumber: number, pageSize: number, searchLoginTerm: string, searchEmailTerm: string) {
        console.log('popali v repo')
        const skipSize = (pageNumber - 1) * pageSize;
        const filter = {
            $or:
                [{"accountData.login": {$regex: searchLoginTerm ?? "", $options: 'i'}},
                    {"accountData.email": {$regex: searchEmailTerm ?? "", $options: "i"}}
                ]
        };
        console.log('before req')
        const totalCount = await UserAccountModel.countDocuments(filter);
        const pagesCount = Math.ceil(totalCount / pageSize)
        console.log('users count', totalCount)

        const getUsers = await UserAccountModel.find(filter)
            .sort({[sortBy]: sortDirection === 'asc' ? 1 : -1})
            .skip(skipSize)
            .limit(pageSize)
            .lean()

        console.log('after users')
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


