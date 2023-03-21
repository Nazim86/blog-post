 import {NextFunction, Request, Response} from "express";
import {validationResult} from "express-validator";

export const inputValidationErrorsMiddleware = (req:Request, res:Response, next: NextFunction)=>{

    const errorsMessages = validationResult(req);
    if (!errorsMessages.isEmpty()) {
        const errorsResponse =
            errorsMessages.array({onlyFirstError:true}).map(err=>({
                message: err.msg,
                field: err.param
            }))

        return res.status(400).json({errorsMessages: errorsResponse});
    } else{
        next()
    }
}

