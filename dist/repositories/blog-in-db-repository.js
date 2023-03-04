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
exports.blogRepository = void 0;
const db_1 = require("../db/db");
const mongodb_1 = require("mongodb");
const blog_mapping_1 = require("../mapping/blog-mapping");
exports.blogRepository = {
    createBlog(newBlog) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield db_1.blogsCollection.insertOne(newBlog);
            return {
                id: result.insertedId.toString(),
                name: newBlog.name,
                description: newBlog.description,
                websiteUrl: newBlog.websiteUrl,
                createdAt: newBlog.createdAt,
                isMembership: newBlog.isMembership
            };
        });
    },
    getBlog() {
        return __awaiter(this, void 0, void 0, function* () {
            const array = yield db_1.blogsCollection.find({}).toArray();
            return (0, blog_mapping_1.blogMapping)(array);
        });
    },
    getBlogById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const foundBlog = yield db_1.blogsCollection.findOne({ _id: new mongodb_1.ObjectId(id) });
                if (foundBlog) {
                    return {
                        id: foundBlog._id.toString(),
                        name: foundBlog.name,
                        description: foundBlog.description,
                        websiteUrl: foundBlog.websiteUrl,
                        createdAt: foundBlog.createdAt,
                        isMembership: foundBlog.isMembership
                    };
                }
                else {
                    return null;
                }
            }
            catch (e) {
                return null;
            }
        });
    },
    updateBlog(id, name, description, websiteUrl) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield db_1.blogsCollection.updateOne({ _id: new mongodb_1.ObjectId(id) }, { $set: { name: name, description: description, websiteUrl: websiteUrl } });
            return result.matchedCount === 1;
        });
    },
    deleteBlogById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield db_1.blogsCollection.deleteOne({ _id: new mongodb_1.ObjectId(id) });
            return result.deletedCount === 1;
        });
    }
};
