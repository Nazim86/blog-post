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
exports.blogQueryRepo = void 0;
const db_1 = require("../db/db");
const blog_mapping_1 = require("../mapping/blog-mapping");
const mongodb_1 = require("mongodb");
// type SortedBy = {
//     fieldname: keyof TemplateStringsArray
//     direction: 'asc' | 'desc'
// }
exports.blogQueryRepo = {
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
                    return false;
                }
            }
            catch (e) {
                return false;
            }
        });
    },
    getBlog(searchNameTerm, sortBy = "createdAt", sortDirection = 'desc', pageNumber = 1, pageSize = 10) {
        return __awaiter(this, void 0, void 0, function* () {
            const filter = { name: { $regex: searchNameTerm !== null && searchNameTerm !== void 0 ? searchNameTerm : '', $options: 'i' } };
            const skipSize = (pageNumber - 1) * pageSize;
            const totalCount = yield db_1.blogsCollection.countDocuments(filter);
            const pagesCount = Math.ceil(totalCount / pageSize);
            const getBlog = yield db_1.blogsCollection.find(filter)
                .sort({ [sortBy]: sortDirection === 'asc' ? 1 : -1 }) // did not understand well
                .skip(skipSize)
                .limit(pageSize)
                .toArray();
            const mappedBlog = (0, blog_mapping_1.blogMapping)(getBlog);
            return {
                pagesCount: pagesCount,
                page: pageNumber,
                pageSize: pageSize,
                totalCount: totalCount,
                items: mappedBlog
            };
        });
    }
};
//# sourceMappingURL=blog-query-repo.js.map