import {CommentService} from "../domain/comment-service";
import {CommentsQueryRepo} from "../query-repositories/comments-query-repo";
import {JwtService} from "../domain/jwt-service";
import {Request, Response} from "express";
import {settings} from "../settings";
import {CommentsViewType} from "../repositories/types/comments-view-type";
import {injectable} from "inversify";

@injectable()
export class CommentController {


    constructor(protected commentService: CommentService,
                protected commentsQueryRepo: CommentsQueryRepo,
                protected jwtService: JwtService) {

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

    async updateCommentLikeStatus(req: Request, res: Response) {

        const likeStatus = req.body.likeStatus;
        const commentId = req.params.commentId
        const userId = req.context.user!._id.toString()

        const updateComment: boolean = await this.commentService.updateCommentLikeStatus(commentId, userId, likeStatus)

        if (!updateComment) {
            return res.sendStatus(404)
        }
        res.sendStatus(204)
    }
}
