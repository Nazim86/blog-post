import {NextFunction, Request, Response} from "express";
import {validationResult} from "express-validator";

export const blogInputMiddleware = (req:Request, res:Response, next: NextFunction)=>{

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const errorsResponse = {
            errorsMessages: errors.array({onlyFirstError:true}).map(err=>({
                message: err.msg,
                field: err.param
            }))
        }
        return res.status(400).json({errors: errors.array()});
    } else{
        next()
    }

}

