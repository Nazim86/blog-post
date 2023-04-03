import {param} from "express-validator";

export const deviceIdValidation = param("id").isString()