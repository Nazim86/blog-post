"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkCommentCredentialsMiddleware = void 0;
const db_1 = require("../db/db");
const mongodb_1 = require("mongodb");
const checkCommentCredentialsMiddleware = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const findComment = yield db_1.commentsCollection.findOne({ _id: new mongodb_1.ObjectId(req.params.commentId) });
    if (findComment) {
        if (findComment.commentatorInfo.userLogin === req.context.user.login && findComment.commentatorInfo.userId === req.context.user.userId) {
            next();
        }
        else {
            res.sendStatus(403);
        }
    }
    else {
        res.sendStatus(404);
    }
});
exports.checkCommentCredentialsMiddleware = checkCommentCredentialsMiddleware;
