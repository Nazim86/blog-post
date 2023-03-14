import {getEmptyUsersData, userPaginationValues} from "./user-data";
import {userFunctions} from "./user-functions";

import {authorizationData} from "./blogs-data";

export const notCreateUser = async (userData: object, authorizationValue: string,statusNumber?:number)=>{

    //Trying to create
    const newUser= await userFunctions.createUser(userData, authorizationValue)
    expect(newUser.status).toBe(statusNumber ?? 400)

    //Checking result with GET
    const {status, body} = await userFunctions.getUsers(userPaginationValues, authorizationData)
    expect(status).toBe(200)
    expect(body).toEqual(getEmptyUsersData)
}

