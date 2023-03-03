import {body, param, query} from "express-validator";
import {blogsCollection} from "../db/db";
import {ObjectId} from "mongodb";

export const nameValidation = body("name").isString().trim().notEmpty().isLength({max:15})
export const description = body("description").isString().trim().notEmpty().isLength({max:500})
export const websiteUrl = body("websiteUrl").isString().trim().notEmpty().isLength({max:100}).matches("^https://([a-zA-Z0-9_-]+\.)+[a-zA-Z0-9_-]+(\/[a-zA-Z0-9_-]+)*\/?$")

export const searchNameValidation = query('searchName').isString()
export const sortByValidation = query('sortBy').isString()
export const sortDirectionValidation = query('sortDirection').isString()
export const pageNumberValidation = query('pageNumber').isNumeric()
export const pageSizeValidation = query('pageSize').isNumeric()

export const queryValidations = [searchNameValidation, sortByValidation, sortDirectionValidation, pageSizeValidation, pageNumberValidation]

export const titleValidation = body('title').isString().trim().notEmpty().isLength({max:30})
export const shortDescriptionValidation = body('shortDescription').isString().trim().notEmpty().isLength({max:100})
export const contentValidation = body('content').isString().trim().notEmpty().isLength({max:1000})

export const postForBlogValidations = [titleValidation,shortDescriptionValidation,contentValidation]

