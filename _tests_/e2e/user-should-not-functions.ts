import {getEmptyUsersData, userPaginationValues} from "./user-data";
import {userFunctions} from "./user-functions";

export const notCreateUser = async (userData:object,authorizationData:string,statusNumber?:number|undefined)=>{

    //Trying to create
    const newUser= await userFunctions.createUser(userData, authorizationData)
    expect(newUser.status).toBe(statusNumber ?? 400)

    //Checking result with GET
    const {status, body} = await userFunctions.getUsers(userPaginationValues, authorizationData)
    expect(status).toBe(200)
    expect(body).toEqual(getEmptyUsersData)
}