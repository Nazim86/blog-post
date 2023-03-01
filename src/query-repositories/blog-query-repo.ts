import {blogsCollection} from "../db/db";
import {BlogsViewType} from "../types/blogs-view-type";
import {blogMapping} from "../mapping/blog-mapping";
import {ObjectId} from "mongodb";
import {BlogQueryType} from "../types/blog-query-type";


export const blogQueryRepo = {

    async getBlog(
        searchNameTerm?:string,sortBy?:string,sortDirection?:string,
        pageNumber:number = 1, pageSize:number = 10): Promise<BlogQueryType> {

        const blogsPagination = (pageNumber-1)*pageSize
        const totalCount = await blogsCollection.countDocuments({})
        const pagesCount = Math.ceil(totalCount/pageSize)


        const getBlog = await blogsCollection.find({name:{$regex:searchNameTerm}}).skip(blogsPagination).toArray()
        const mappedBlog =  blogMapping(getBlog)
        return {
            pagesCount: pagesCount,
            page: pageNumber,
            pageSize: pageSize,
            totalCount: totalCount,
            items: mappedBlog
        }

    },

    async getBlogById(_id: ObjectId): Promise<BlogsViewType | boolean> {

        const foundBlog = await blogsCollection.findOne({_id: _id})
        if (foundBlog) {
            return {
                id: foundBlog._id.toString(),
                name: foundBlog.name,
                description: foundBlog.description,
                websiteUrl: foundBlog.websiteUrl,
                createdAt: foundBlog.createdAt,
                isMembership: foundBlog.isMembership
            }
        } else {
            return false
        }
    },
}

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