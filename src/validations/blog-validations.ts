import {body} from "express-validator";

export const nameValidation = body("name").isString().trim().notEmpty().isLength({max:15})
export const description = body("description").isString().trim().notEmpty().isLength({max:500})
export const websiteUrl = body("websiteUrl").isString().trim().notEmpty().isLength({max:100}).matches("^https://([a-zA-Z0-9_-]+\.)+[a-zA-Z0-9_-]+(\/[a-zA-Z0-9_-]+)*\/?$")
