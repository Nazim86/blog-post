import { Router} from "express";
import {baseAuthorizationMiddleware} from "../middlewares/base-auth-middlewares";
import {inputValidationErrorsMiddleware} from "../middlewares/input-validation-errors-middleware";
import {
    blogIdValidation,
    contentValidation,
    descriptionValidation, postCommentContentValidation,
    postNameValidation
} from "../validations/post-validations";
import {likeValidation} from "../validations/like-validation";
import {container} from "../composition-root";
import {PostController} from "../controllers/post-controller";
import {checkUserByAccessTokenMiddleware} from "../middlewares/check-user-by-accessToken-middleware";

export const postRoutes = Router({})

const postController = container.resolve(PostController)


const createPostValidation = [postNameValidation, descriptionValidation, contentValidation, blogIdValidation, inputValidationErrorsMiddleware] //


postRoutes.get('/', postController.getPosts.bind(postController))

postRoutes.get('/:id', postController.getPostById.bind(postController))


postRoutes.get('/:postId/comments', postController.getCommentByPostId.bind(postController))

postRoutes.post('/', baseAuthorizationMiddleware, createPostValidation,
    postController.createPost.bind(postController))

postRoutes.post('/:postId/comments', checkUserByAccessTokenMiddleware, postCommentContentValidation, inputValidationErrorsMiddleware,
    postController.createCommentByPostId.bind(postController))


postRoutes.put('/:id', baseAuthorizationMiddleware, createPostValidation,
    postController.updatePost.bind(postController))

postRoutes.put('/:id/like-status', checkUserByAccessTokenMiddleware, likeValidation, inputValidationErrorsMiddleware,
    postController.updatePostLikeStatus.bind(postController))

postRoutes.delete('/:id', baseAuthorizationMiddleware, postController.deletePost.bind(postController))
