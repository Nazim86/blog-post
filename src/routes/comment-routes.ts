import {Request, Response, Router} from "express";
import {checkUserByAccessTokenMiddleware} from "../middlewares/check-user-by-accessToken-middleware";
import {postCommentContentValidation} from "../validations/post-validations";
import {inputValidationErrorsMiddleware} from "../middlewares/input-validation-errors-middleware";
import {CommentsViewType} from "../repositories/types/comments-view-type";
import {checkCommentCredentialsMiddleware} from "../middlewares/check-comment-credentials-middleware";
import {likeValidation} from "../validations/like-validation";
import {settings} from "../settings";
import {CommentService} from "../domain/comment-service";
import {CommentsQueryRepo} from "../query-repositories/comments-query-repo";
import {JwtService} from "../domain/jwt-service";


export const commentRoutes = Router({})

class CommentController {

    private commentService: CommentService
    private commentsQueryRepo:CommentsQueryRepo
    private jwtService: JwtService

    constructor() {
        this.commentService = new CommentService()
        this.commentsQueryRepo = new CommentsQueryRepo()
        this.jwtService = new JwtService()
    }

    async updateCommentByCommentId(req: Request, res: Response) {

        const content = req.body.content;

        const updateComment: boolean = await this.commentService.updateComment(req.params.commentId, content)

        if (!updateComment) {
            return res.sendStatus(404)
        }

        res.sendStatus(204)

    }

    async deleteCommentByCommentId(req: Request, res: Response) {

        const deleteComment: boolean = await this.commentService.deleteComment(req.params.commentId)

        if (!deleteComment) {
            return res.sendStatus(404)
        }

        res.sendStatus(204)
    }

    async getCommentByCommentId(req: Request, res: Response) {

        const accessToken: string | undefined = req.headers.authorization?.split(" ")[1]

        let userId = undefined

        if (accessToken) {
            const tokenData = await this.jwtService.getTokenMetaData(accessToken, settings.ACCESS_TOKEN_SECRET)
            if (tokenData) {
                userId = tokenData.userId
            }

        }
        const getComment: CommentsViewType | null = await this.commentsQueryRepo.getComment(req.params.commentId, userId)

        if (!getComment) {
            return res.sendStatus(404)
        }
        res.status(200).send(getComment)
    }

    async updateLikeStatus(req: Request, res: Response) {

        const likeStatus = req.body.likeStatus;
        const commentId = req.params.commentId
        const userId = req.context.user!._id.toString()

        const updateComment: boolean = await this.commentService.updateLikeStatus(commentId, userId, likeStatus)

        if (!updateComment) {
            return res.sendStatus(404)
        }
        res.sendStatus(204)
    }
}

const commentController = new CommentController()

commentRoutes.put('/:commentId', checkUserByAccessTokenMiddleware, checkCommentCredentialsMiddleware, postCommentContentValidation, inputValidationErrorsMiddleware,
    commentController.updateCommentByCommentId.bind(commentController))

commentRoutes.delete('/:commentId', checkUserByAccessTokenMiddleware, checkCommentCredentialsMiddleware,
    commentController.deleteCommentByCommentId.bind(commentController))

commentRoutes.get('/:commentId',
    commentController.getCommentByCommentId.bind(commentController))

commentRoutes.put('/:commentId/like-status', checkUserByAccessTokenMiddleware, likeValidation, inputValidationErrorsMiddleware,
    commentController.updateLikeStatus.bind(commentController))
