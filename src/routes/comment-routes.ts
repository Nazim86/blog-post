import {Request, Response, Router} from "express";
import {checkUserByAccessTokenMiddleware} from "../middlewares/check-user-by-accessToken-middleware";
import {postCommentContentValidation} from "../validations/post-validations";
import {inputValidationErrorsMiddleware} from "../middlewares/input-validation-errors-middleware";
import {commentService} from "../domain/comment-service";
import {commentsQueryRepo} from "../query-repositories/comments-query-repo";
import {CommentsViewType} from "../repositories/types/comments-view-type";
import {checkCommentCredentialsMiddleware} from "../middlewares/check-comment-credentials-middleware";

export const commentRoutes = Router({})

commentRoutes.put('/:commentId', checkUserByAccessTokenMiddleware,checkCommentCredentialsMiddleware, postCommentContentValidation,inputValidationErrorsMiddleware,
    async (req: Request, res: Response) => {

        const content = req.body.content;



        const updateComment:boolean = await commentService.updateComment(req.params.commentId, content)

        if (updateComment) {
            res.send(204)
        } else {
            res.send(404)
        }
    })

commentRoutes.delete('/:commentId', checkUserByAccessTokenMiddleware,checkCommentCredentialsMiddleware,
    async (req: Request, res: Response) => {

        const deleteComment:boolean = await commentService.deleteComment(req.params.commentId)

        if (deleteComment) {
            res.send(204)
        } else {
            res.send(404)
        }
    })

commentRoutes.get('/:commentId',
    async (req: Request, res: Response) => {

        const getComment:CommentsViewType|null = await commentsQueryRepo.getComment(req.params.commentId)

        if (getComment) {
            res.status(200).send(getComment)
        } else {
            res.send(404)
        }
    })
