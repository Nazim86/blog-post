import {Router} from "express";
import {checkUserByAccessTokenMiddleware} from "../middlewares/check-user-by-accessToken-middleware";
import {inputValidationErrorsMiddleware} from "../middlewares/input-validation-errors-middleware";
import {checkCommentCredentialsMiddleware} from "../middlewares/check-comment-credentials-middleware";
import {postCommentContentValidation} from "../validations/post-validations";
import {likeValidation} from "../validations/like-validation";
import {container} from "../composition-root";
import {CommentController} from "../controllers/comment-controller";



export const commentRoutes = Router({})

const commentController = container.resolve(CommentController)

commentRoutes.put('/:commentId', checkUserByAccessTokenMiddleware, checkCommentCredentialsMiddleware, postCommentContentValidation, inputValidationErrorsMiddleware,
    commentController.updateCommentByCommentId.bind(commentController))

commentRoutes.delete('/:commentId', checkUserByAccessTokenMiddleware, checkCommentCredentialsMiddleware,
    commentController.deleteCommentByCommentId.bind(commentController))

commentRoutes.get('/:commentId',
    commentController.getCommentByCommentId.bind(commentController))

commentRoutes.put('/:commentId/like-status', checkUserByAccessTokenMiddleware, likeValidation, inputValidationErrorsMiddleware,
    commentController.updateCommentLikeStatus.bind(commentController))
