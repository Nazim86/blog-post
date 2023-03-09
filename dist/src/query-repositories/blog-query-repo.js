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
//----------------------------------------------------------------------------------
//
//         const foundBlog = await blogsCollection.findOne({_id: _id})
//         if (foundBlog) {
//             return {
//                 id: foundBlog._id.toString(),
//                 name: foundBlog.name,
//                 description: foundBlog.description,
//                 websiteUrl: foundBlog.websiteUrl,
//                 createdAt: foundBlog.createdAt,
//                 isMembership: foundBlog.isMembership
//             }
//         } else {
//             return false
//         }
//     },
// }
// let users = [
// {id:'dsdf2-sdfs-23', name:'dimych', age:34},
// {id:'csdc3-ddfs-11', name:'ivan', age:30},
// {id:'dsdc1-dwfs-31', name:'ignat', age:20},
//     {id:'qsdf2-sdfs-23', name:'kolya', age:22},
// {id:'6sac2-1d1s-21', name:'artem', age:20},
//     {id:'6sac2-1d1s-21', name:'artem', age:22},
//     {id:'6sac2-1d1s-21', name:'artem', age:28},
//     {id:'6sac2-1d1s-21', name:'artem', age:25},
//     {id:'7sac2-1d1s-21', name:'artem', age:30},
//     {id:'11sac2-1d1s-21', name:'artem', age:30},
//     {id:'10sac2-1d1s-21', name:'artem', age:30},
//     {id:'9ac2-1d1s-21', name:'artem', age:30},
//     {id:'8sac2-1d1s-21', name:'artem', age:30},
//
// ]
//
// type SortedBy <T>= {
//     fieldName: keyof T
//     direction: 'asc'|'desc'
// }
// const getSortedItems = <T>(items:T[],sortBy:SortedBy<T>[])=>{
//     return [...items].sort((u1,u2)=>{
//
//         for (let sortConfig of sortBy){
//
//             if (u1[sortConfig.fieldName]<u2[sortConfig.fieldName]){
//                 return sortConfig.direction === 'asc' ? -1 : 1
//             }
//             if (u1[sortConfig.fieldName]>u2[sortConfig.fieldName]){
//                 return sortConfig.direction === 'asc' ? 1 : -1
//             }
//
//         }
//
//
//         return 0
//     });
// }
//
// console.log(getSortedItems(users,[{fieldName: 'name', direction: 'asc'},{fieldName: 'age', direction: 'desc'},{fieldName: 'id', direction: 'asc'}]))
