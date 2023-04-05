import {Response} from "express";
import {ResultCode} from "./result-code-enum";

export const handleErrorResult = (response: Response, code: ResultCode) => {
    switch (code) {
        case ResultCode.NotFound:
            return response.sendStatus(404)
        case ResultCode.Forbidden:
            return response.sendStatus(403)
        //..
        default:
            return
    }
}
