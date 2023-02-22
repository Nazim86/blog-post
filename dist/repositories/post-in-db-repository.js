"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postRepository = exports.posts = void 0;
exports.posts = [];
exports.postRepository = {
    createPost(title, shortDescription, content, blogId) {
        const newId = new Date();
        const creatingPost = {
            id: newId.toISOString(),
            title: title,
            shortDescription: shortDescription,
            content: content,
            blogId: blogId,
            blogName: newId.toString()
        };
        exports.posts.push(creatingPost);
        return creatingPost;
    },
    getPostById(id) {
        return exports.posts.find(p => p.id === id);
    },
    updatePost(id, title, shortDescription, content, blogId) {
        const updateById = exports.posts.find(p => p.id === id);
        if (updateById) {
            updateById.title = title;
            updateById.shortDescription = shortDescription;
            updateById.content = content;
            updateById.blogId = blogId;
            return true;
        }
    },
    deletePostById(id) {
        const deleteById = exports.posts.find(p => p.id === id);
        if (deleteById) {
            exports.posts.splice(exports.posts.indexOf(deleteById), 1);
            return true;
        }
    }
};
