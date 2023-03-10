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
exports.commentsQueryRepo = void 0;
const db_1 = require("../db/db");
const mongodb_1 = require("mongodb");
const comment_mapping_1 = require("../mapping/comment-mapping");
const post_in_db_repository_1 = require("../repositories/post-in-db-repository");
exports.commentsQueryRepo = {
    getCommentsForPost(postId, pageNumber, pageSize, sortBy, sortDirection) {
        return __awaiter(this, void 0, void 0, function* () {
            const postById = yield post_in_db_repository_1.postRepository.getPostById(postId);
            if (!postById)
                return null;
            const skipSize = (pageNumber - 1) * pageSize;
            const totalCount = yield db_1.commentsCollection.countDocuments({ postId: postId });
            const pagesCount = Math.ceil(totalCount / pageSize);
            const getCommentsForPost = yield db_1.commentsCollection.find({ postId: postId })
                .sort({ [sortBy]: sortDirection === "asc" ? 1 : -1 })
                .skip(skipSize)
                .limit(pageSize)
                .toArray();
            const mappedComment = (0, comment_mapping_1.commentMapping)(getCommentsForPost);
            return {
                pagesCount: pagesCount,
                page: pageNumber,
                pageSize: pageSize,
                totalCount: totalCount,
                items: mappedComment
            };
        });
    },
    getComment(commentId) {
        return __awaiter(this, void 0, void 0, function* () {
            const getComment = yield db_1.commentsCollection.findOne({ _id: new mongodb_1.ObjectId(commentId) });
            if (!getComment)
                return null;
            return {
                id: getComment._id.toString(),
                content: getComment.content,
                commentatorInfo: {
                    userId: getComment.commentatorInfo.userId,
                    userLogin: getComment.commentatorInfo.userLogin
                },
                createdAt: getComment.createdAt
            };
        });
    }
};
//# sourceMappingURL=comments-query-repo.js.map