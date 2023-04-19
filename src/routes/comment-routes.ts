import {Request, Response, Router} from "express";
import {checkUserByAccessTokenMiddleware} from "../middlewares/check-user-by-accessToken-middleware";
import {postCommentContentValidation} from "../validations/post-validations";
import {inputValidationErrorsMiddleware} from "../middlewares/input-validation-errors-middleware";
import {commentService} from "../domain/comment-service";
import {commentsQueryRepo} from "../query-repositories/comments-query-repo";
import {CommentsViewType} from "../repositories/types/comments-view-type";
import {checkCommentCredentialsMiddleware} from "../middlewares/check-comment-credentials-middleware";
import {likeValidation} from "../validations/like-validation";
import {jwtService} from "../domain/jwt-service";
import {settings} from "../settings";

export const commentRoutes = Router({})

commentRoutes.put('/:commentId', checkUserByAccessTokenMiddleware,checkCommentCredentialsMiddleware, postCommentContentValidation,inputValidationErrorsMiddleware,
    async (req: Request, res: Response) => {

        const content = req.body.content;

        const updateComment:boolean = await commentService.updateComment(req.params.commentId, content)

        if (!updateComment) {
            res.sendStatus(404)
        }

        res.sendStatus(204)

    })

commentRoutes.delete('/:commentId', checkUserByAccessTokenMiddleware,checkCommentCredentialsMiddleware,
    async (req: Request, res: Response) => {

        const deleteComment:boolean = await commentService.deleteComment(req.params.commentId)

        if (!deleteComment) {
            res.sendStatus(404)
        }

        res.sendStatus(204)
    })

commentRoutes.get('/:commentId',
    async (req: Request, res: Response) => {

    const accessToken: string | undefined = req.headers.authorization

    let userId = undefined

    if (accessToken) {
        const tokenData = await jwtService.getRefreshTokenMetaData(accessToken, settings.ACCESS_TOKEN_SECRET)
        if(tokenData){
            userId = tokenData.userId
        }

    }

    const getComment: CommentsViewType | null = await commentsQueryRepo.getComment(req.params.commentId, userId)

    if (!getComment) {
        return res.sendStatus(404)
    }
    res.status(200).send(getComment)

    })


commentRoutes.put('/:commentId/like-status', checkUserByAccessTokenMiddleware,likeValidation,inputValidationErrorsMiddleware,
    async (req: Request, res: Response) => {

        const likeStatus = req.body.likeStatus;
        const commentId = req.params.commentId
        const userId = req.context.user!._id.toString()

        const updateComment:boolean = await commentService.updateLikeStatus(commentId, userId, likeStatus)

        if(!updateComment) {
            return res.sendStatus(404)
        }
        res.sendStatus(204)
    })
