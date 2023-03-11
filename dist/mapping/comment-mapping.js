"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.commentMapping = void 0;
const commentMapping = (array) => {
    return array.map((postComment) => {
        return {
            id: postComment._id.toString(),
            content: postComment.content,
            commentatorInfo: {
                userId: postComment.commentatorInfo.userId,
                userLogin: postComment.commentatorInfo.userLogin
            },
            createdAt: postComment.createdAt
        };
    });
};
exports.commentMapping = commentMapping;
