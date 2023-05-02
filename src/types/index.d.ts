import {UserAccount} from "../infrastructure/repositories/types/user-account";


declare global{
    declare namespace Express{
        export interface Request{
            context:{
                user?:UserAccount|null
            }
        }
    }
}
