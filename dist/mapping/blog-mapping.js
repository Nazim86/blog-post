"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.blogMapping = void 0;
const blogMapping = (array) => {
    return array.map((blog) => {
        return {
            id: blog._id.toString(),
            name: blog.name,
            description: blog.name,
            websiteUrl: blog.websiteUrl,
            createdAt: blog.createdAt,
            isMembership: blog.isMembership
        };
    });
};
exports.blogMapping = blogMapping;
