import {NextFunction, Request, Response} from "express";
import {ObjectId} from "mongodb";
import {CommentModel} from "../db/db";

export const checkCommentCredentialsMiddleware = async (req:Request, res:Response, next:NextFunction)=>{

    const findComment = await CommentModel.findOne({_id:new ObjectId(req.params.commentId)})

    if (findComment){
        if (findComment.commentatorInfo.userLogin === req.context.user!.accountData.login && findComment.commentatorInfo.userId === req.context.user!._id.toString() ){
            next()
        }
        else{
            res.sendStatus(403)
        }
    }else
    {
        res.sendStatus(404)
    }
}