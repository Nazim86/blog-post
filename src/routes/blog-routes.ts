import {Router} from "express";
import {baseAuthorizationMiddleware} from "../middlewares/base-auth-middlewares";
import {inputValidationErrorsMiddleware} from "../middlewares/input-validation-errors-middleware";
import {
    description,
    nameValidation, postForBlogValidations, queryValidations,
    websiteUrl
} from "../validations/blog-validations";
import {blogController} from "../composition-root";

export const blogRoutes = Router({})

const createPostValidations = [nameValidation, description, websiteUrl, inputValidationErrorsMiddleware]

blogRoutes.get('/', queryValidations, blogController.getBlogs.bind(blogController));

blogRoutes.get('/:blogId/posts', queryValidations, blogController.getPostsByBlogId.bind(blogController));

blogRoutes.post('/', baseAuthorizationMiddleware, createPostValidations, blogController.createBlog.bind(blogController));

blogRoutes.post('/:blogId/posts', baseAuthorizationMiddleware, postForBlogValidations, inputValidationErrorsMiddleware, blogController.createPostByBlogId.bind(blogController));

blogRoutes.get('/:id', blogController.getBlogById.bind(blogController));

blogRoutes.put('/:id', baseAuthorizationMiddleware, createPostValidations, blogController.updateBlog.bind(blogController));

blogRoutes.delete('/:id', baseAuthorizationMiddleware, blogController.deleteBlog.bind(blogController));
