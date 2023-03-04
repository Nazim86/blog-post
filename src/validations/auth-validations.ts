import {body} from "express-validator";

export const loginOrEmailValidation = body("loginOrEmail").isString().trim().notEmpty()
export const passwordValidation = body("password").isString().trim().notEmpty()

export const authValidations = [loginOrEmailValidation,passwordValidation]