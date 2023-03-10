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
exports.commentDbRepository = void 0;
const db_1 = require("../db/db");
const mongodb_1 = require("mongodb");
exports.commentDbRepository = {
    createPostComment(postComment, userId, userLogin) {
        return __awaiter(this, void 0, void 0, function* () {
            const comment = yield db_1.commentsCollection.insertOne(postComment);
            return {
                id: comment.insertedId.toString(),
                content: postComment.content,
                commentatorInfo: {
                    userId: userId,
                    userLogin: userLogin
                },
                createdAt: postComment.createdAt
            };
        });
    },
    updateComment(commentId, content) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield db_1.commentsCollection.updateOne({ _id: new mongodb_1.ObjectId(commentId) }, { $set: { content: content } });
            return result.matchedCount === 1;
        });
    },
    deleteComment(commentId) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield db_1.commentsCollection.deleteOne({ _id: new mongodb_1.ObjectId(commentId) });
            return result.deletedCount === 1;
        });
    }
};
//# sourceMappingURL=comment-db-repository.js.map