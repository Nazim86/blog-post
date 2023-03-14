"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postMapping = void 0;
const postMapping = (array) => {
    return array.map((post) => {
        return {
            id: post._id.toString(),
            title: post.title,
            shortDescription: post.shortDescription,
            content: post.content,
            blogId: post.blogId,
            blogName: post.blogName,
            createdAt: post.createdAt
        };
    });
};
exports.postMapping = postMapping;
//# sourceMappingURL=post-mapping.js.map