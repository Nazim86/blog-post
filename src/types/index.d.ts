import {UserDbType} from "../repositories/types/user-db-type";

// declare global{
//     declare namespace Express{
//         export interface Request{
//             context:UserDbType |null
//
//         }
//     }
// }
declare global{
    declare namespace Express{
        export interface Request{
            context:{
                user:UserDbType |null
            }
        }
    }
}
