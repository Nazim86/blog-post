import {UserAccountDbType} from "../repositories/types/user-account-db-type";


declare global{
    declare namespace Express{
        export interface Request{
            context:{
                user?:UserAccountDbType|null
            }
        }
    }
}
