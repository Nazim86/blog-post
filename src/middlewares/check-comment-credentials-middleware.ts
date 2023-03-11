import {commentsCollection} from "../db/db";
import {NextFunction, Request, Response} from "express";
import {ObjectId} from "mongodb";

export const checkCommentCredentialsMiddleware = async (req:Request, res:Response, next:NextFunction)=>{

    const findComment = await commentsCollection.findOne({_id:new ObjectId(req.params.commentId)})

    if (findComment){
        if (findComment.commentatorInfo.userLogin === req.context.user!.login && findComment.commentatorInfo.userId === req.context.user!.userId ){
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