import {NextFunction, Request, Response} from "express";

import {usersAccountsCollection} from "../db/db";

export const checkUsersAccountsCredentialsMiddleware = async ( req: Request, res: Response, next: NextFunction) => {
    const login = req.body.login
    const email = req.body.email

    const checkCredentials = await usersAccountsCollection.findOne({$or: [{"accountData.login": login}, {"accountData.email": email}]})

    // const errorsMessages = validationResult(req);
    // if (!errorsMessages.isEmpty()) {
    //     const errorsResponse =
    //         errorsMessages.array({onlyFirstError:true}).map(err=>({
    //             message: err.msg,
    //             field: err.param
    //         }))
    //     if (checkCredentials){ return res.status(400).json({errorsMessages: errorsResponse})};
    // } else{
    //     next()
    // }

    if (checkCredentials) {

        res.status(400).send({
            errorsMessages: [{
                message: "Existing users",
                field: "email"
            }]
        })

    } else {
        next()
    }

}

//
// try {
//     if (checkCredentials) {
//         throw new Error("msg");
//
//     }
// } catch (e) {
//     console.log("for new Error()");
//     console.log(e);
//     res.sendStatus(400)
// }
//
// next()




