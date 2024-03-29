import {body} from "express-validator";
import {ObjectId} from "mongodb";
import {BlogModel} from "../db/db";

export const postNameValidation = body("title").isString().trim().notEmpty().isLength({max: 30})
export const descriptionValidation = body("shortDescription").isString().trim().notEmpty().isLength({max: 100})
export const contentValidation = body("content").isString().trim().notEmpty().isLength({max: 1000})
export const blogIdValidation = body("blogId").isString().trim().notEmpty().custom(async value => {
    const blog = await BlogModel.findOne({_id: new ObjectId(value)})
    if (!blog) {
        throw new Error()
    }else{
        return true
    }
})

export const postCommentContentValidation = body("content").isString().trim().notEmpty().isLength({min:20,max:300})

