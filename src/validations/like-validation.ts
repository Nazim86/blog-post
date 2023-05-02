import {body} from "express-validator";
import { likeStatus} from "../infrastructure/repositories/enums/like-enum";

export const likeValidation = body("likeStatus").isString().trim().notEmpty().isIn(likeStatus)