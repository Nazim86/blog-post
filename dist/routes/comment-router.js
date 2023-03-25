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
exports.commentRouter = void 0;
const express_1 = require("express");
const check_user_by_accessToken_middleware_1 = require("../middlewares/check-user-by-accessToken-middleware");
const post_validations_1 = require("../validations/post-validations");
const input_validation_errors_middleware_1 = require("../middlewares/input-validation-errors-middleware");
const comment_service_1 = require("../domain/comment-service");
const comments_query_repo_1 = require("../query-repositories/comments-query-repo");
const check_comment_credentials_middleware_1 = require("../middlewares/check-comment-credentials-middleware");
exports.commentRouter = (0, express_1.Router)({});
exports.commentRouter.put('/:commentId', check_user_by_accessToken_middleware_1.checkUserByAccessTokenMiddleware, check_comment_credentials_middleware_1.checkCommentCredentialsMiddleware, post_validations_1.postCommentContentValidation, input_validation_errors_middleware_1.inputValidationErrorsMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const content = req.body.content;
    const updateComment = yield comment_service_1.commentService.updateComment(req.params.commentId, content);
    if (updateComment) {
        res.send(204);
    }
    else {
        res.send(404);
    }
}));
exports.commentRouter.delete('/:commentId', check_user_by_accessToken_middleware_1.checkUserByAccessTokenMiddleware, check_comment_credentials_middleware_1.checkCommentCredentialsMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const deleteComment = yield comment_service_1.commentService.deleteComment(req.params.commentId);
    if (deleteComment) {
        res.send(204);
    }
    else {
        res.send(404);
    }
}));
exports.commentRouter.get('/:commentId', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const getComment = yield comments_query_repo_1.commentsQueryRepo.getComment(req.params.commentId);
    if (getComment) {
        res.status(200).send(getComment);
    }
    else {
        res.send(404);
    }
}));
//# sourceMappingURL=comment-router.js.map