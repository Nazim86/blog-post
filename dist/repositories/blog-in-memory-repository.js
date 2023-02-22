"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.blogRepository = exports.blogs = void 0;
exports.blogs = [];
exports.blogRepository = {
    createBlog(name, description, websiteUrl) {
        const newId = new Date();
        const creatingBlog = {
            id: newId.toISOString(),
            name: name,
            description: description,
            websiteUrl: websiteUrl
        };
        exports.blogs.push(creatingBlog);
        return creatingBlog;
    },
    getBlogById(id) {
        return exports.blogs.find(p => p.id === id);
    },
    updateBlog(id, name, description, websiteUrl) {
        const updateById = exports.blogs.find(p => p.id === id);
        if (updateById) {
            updateById.name = name;
            updateById.description = description;
            updateById.websiteUrl = websiteUrl;
            return true;
        }
    },
    deleteBlogById(id) {
        const deleteById = exports.blogs.find(p => p.id === id);
        if (deleteById) {
            exports.blogs.splice(exports.blogs.indexOf(deleteById), 1);
            return true;
        }
    }
};
