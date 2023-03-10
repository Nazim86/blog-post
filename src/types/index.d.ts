import {UserByIdType} from "../repositories/types/user-by-id-type";


declare global{
    declare namespace Express{
        export interface Request{
            context:{
                user?:UserByIdType|null
            }
        }
    }
}
