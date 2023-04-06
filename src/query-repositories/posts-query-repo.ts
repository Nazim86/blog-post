import { postsCollection} from "../db/db";
import {postMapping} from "../mapping/post-mapping";
import {PostsViewType} from "../repositories/types/posts-view-type";
import {PostsDbType} from "../repositories/types/posts-db-type";
import {ObjectId} from "mongodb";
import {QueryPaginationType} from "../repositories/types/query-type";


export const postQueryRepo = {


        async getPostById(id:string): Promise<PostsViewType |boolean>{
            try {
                const postById = await postsCollection.findOne({_id: new ObjectId(id)})
                if (postById) {
                    return {
                        id: postById._id.toString(),
                        title: postById.title,
                        shortDescription: postById.shortDescription,
                        content: postById.content,
                        blogId: postById.blogId,
                        blogName: postById.blogName,
                        createdAt: postById.createdAt
                    }
                }else{
                    return false
                }
            }
            catch(e){
                return false
            }

        },

        async getPost(pageNumber:number,pageSize:number,sortBy:string,sortDirection:string):Promise<QueryPaginationType<PostsViewType[]>>{

            const skipSize = (pageNumber - 1) * pageSize
            const totalCount = await postsCollection.countDocuments({})
            const pagesCount = Math.ceil(totalCount / pageSize)

            const getposts:PostsDbType[] = await postsCollection.find({})
                .sort({[sortBy]:sortDirection==='asc' ? 1: -1})
                .skip(skipSize)
                .limit(pageSize)
                .toArray();

            const mappedPost: PostsViewType[] = postMapping(getposts);

            return {
                pagesCount: pagesCount,
                page: pageNumber,
                pageSize: pageSize,
                totalCount: totalCount,
                items: mappedPost
            }
        },

        async getPostsByBlogId(pageNumber: number, pageSize: number, sortBy: string, sortDirection: string, blogId: string):
            Promise<QueryPaginationType<PostsViewType[]> | boolean> {


            const skipSize = (pageNumber - 1) * pageSize
            const totalCount = await postsCollection.countDocuments({blogId: blogId})
            const pagesCount = Math.ceil(totalCount / pageSize)


            const getPostsByBlogId:PostsDbType[] = await postsCollection.find({blogId: blogId})
                .sort({[sortBy]: sortDirection === 'asc' ? 1 : -1})
                .skip(skipSize)
                .limit(pageSize)
                .toArray()


            if (getPostsByBlogId.length ===0) return false

            const mappedBlog:PostsViewType[] = postMapping(getPostsByBlogId)


            return {
                pagesCount: pagesCount,
                page: pageNumber,
                pageSize: pageSize,
                totalCount: totalCount,
                items: mappedBlog

            }
        }
    }