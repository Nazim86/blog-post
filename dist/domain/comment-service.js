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
exports.commentService = void 0;
const post_in_db_repository_1 = require("../repositories/post-in-db-repository");
const mongodb_1 = require("mongodb");
const comment_db_repository_1 = require("../repositories/comment-db-repository");
exports.commentService = {
    createPostComment(postId, content, userId, userLogin) {
        return __awaiter(this, void 0, void 0, function* () {
            const postById = yield post_in_db_repository_1.postRepository.getPostById(postId);
            if (!postById || typeof postById === "boolean")
                return null;
            const postComment = {
                _id: new mongodb_1.ObjectId(),
                postId: postById.id,
                content: content,
                commentatorInfo: {
                    userId: userId,
                    userLogin: userLogin
                },
                createdAt: new Date().toISOString()
            };
            return yield comment_db_repository_1.commentDbRepository.createPostComment(postComment, userId, userLogin);
        });
    },
    updateComment(commentId, content) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield comment_db_repository_1.commentDbRepository.updateComment(commentId, content);
        });
    },
    deleteComment(commentId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield comment_db_repository_1.commentDbRepository.deleteComment(commentId);
        });
    }
};
//# sourceMappingURL=comment-service.js.map