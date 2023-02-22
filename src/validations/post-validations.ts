import {body} from "express-validator";
import {blogs} from "../repositories/blog-in-memory-repository";

export const postNameValidation = body("title").isString().trim().notEmpty().isLength({max: 30})
export const descriptionValidation = body("shortDescription").isString().trim().notEmpty().isLength({max: 100})
export const contentValidation = body("content").isString().trim().notEmpty().isLength({max: 1000})
export const blogIdValidation = body("blogId").isString().trim().notEmpty().custom(value => {
    const blog = blogs.find(b => b.id === value)
    if (!blog) throw new Error()
    return true;
})
